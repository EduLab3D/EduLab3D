import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useTranslation } from 'react-i18next'
import '../App.css'

const MIN_LENGTH_CM = 6
const MAX_LENGTH_CM = 24
const INITIAL_LENGTH_CM = 15
const LENGTH_TO_WORLD = 0.08
const CYLINDER_RADIUS_WORLD = 0.8
const BASE_BOTTOM = -1.6
const MOLECULE_COUNT = 60
const CYLINDER_RADIUS_M = 0.04 // 4 cm radius chamber
const BASE_AREA_M2 = Math.PI * CYLINDER_RADIUS_M * CYLINDER_RADIUS_M
const INITIAL_PRESSURE_ATM = 1
const PV_CONSTANT = INITIAL_PRESSURE_ATM * (INITIAL_LENGTH_CM / 100) * BASE_AREA_M2

type Molecule = {
	position: THREE.Vector3
	velocity: THREE.Vector3
}

const createMolecule = (): Molecule => ({
	position: new THREE.Vector3(
		(Math.random() - 0.5) * CYLINDER_RADIUS_WORLD * 1.4,
		BASE_BOTTOM + Math.random() * (MAX_LENGTH_CM * LENGTH_TO_WORLD - 0.2) + 0.1,
		(Math.random() - 0.5) * CYLINDER_RADIUS_WORLD * 1.4
	),
	velocity: new THREE.Vector3(
		(Math.random() - 0.5) * 0.6,
		(Math.random() - 0.5) * 0.6,
		(Math.random() - 0.5) * 0.6
	)
})

function AirMolecules({ heightWorld, pressure }: { heightWorld: number, pressure: number }) {
	const molecules = useMemo<Molecule[]>(() => Array.from({ length: MOLECULE_COUNT }, () => createMolecule()), [])
	const meshRefs = useRef<THREE.Mesh[]>([])

	useFrame((_, delta) => {
		const bounds = {
			x: CYLINDER_RADIUS_WORLD - 0.1,
			z: CYLINDER_RADIUS_WORLD - 0.1,
			yMin: BASE_BOTTOM + 0.05,
			yMax: BASE_BOTTOM + Math.max(heightWorld - 0.05, 0.25),
		}
		const speedFactor = 0.7 + (pressure - 1) * 0.25

		molecules.forEach((molecule, index) => {
			molecule.position.addScaledVector(molecule.velocity, delta * speedFactor)

			if (molecule.position.x > bounds.x || molecule.position.x < -bounds.x) {
				molecule.position.x = THREE.MathUtils.clamp(molecule.position.x, -bounds.x, bounds.x)
				molecule.velocity.x *= -1
			}

			if (molecule.position.z > bounds.z || molecule.position.z < -bounds.z) {
				molecule.position.z = THREE.MathUtils.clamp(molecule.position.z, -bounds.z, bounds.z)
				molecule.velocity.z *= -1
			}

			if (molecule.position.y > bounds.yMax) {
				molecule.position.y = bounds.yMax
				molecule.velocity.y = -Math.abs(molecule.velocity.y)
			}

			if (molecule.position.y < bounds.yMin) {
				molecule.position.y = bounds.yMin
				molecule.velocity.y = Math.abs(molecule.velocity.y)
			}

			const mesh = meshRefs.current[index]
			if (mesh) {
				mesh.position.copy(molecule.position)
			}
		})
	})

	return (
		<>
			{molecules.map((_, index) => (
				<mesh
					key={`molecule-${index}`}
					ref={(node) => {
						if (node) {
							meshRefs.current[index] = node
						}
					}}
					castShadow
					receiveShadow
				>
					<sphereGeometry args={[0.07, 16, 16]} />
					<meshStandardMaterial
						color="#93c5fd"
						emissive="#38bdf8"
						emissiveIntensity={0.6}
						roughness={0.3}
						metalness={0.1}
					/>
				</mesh>
			))}
		</>
	)
}

function PistonAssembly({ lengthCm }: { lengthCm: number }) {
	const heightWorld = lengthCm * LENGTH_TO_WORLD
	const topY = BASE_BOTTOM + heightWorld
	const chamberCenter = BASE_BOTTOM + heightWorld / 2

	return (
		<group>
			<mesh position={[0, chamberCenter, 0]} castShadow>
				<cylinderGeometry args={[CYLINDER_RADIUS_WORLD, CYLINDER_RADIUS_WORLD, heightWorld, 64, 1, true]} />
				<meshPhysicalMaterial
					color="#60a5fa"
					transmission={0}
					opacity={0.25}
					metalness={0.1}
					roughness={0.15}
					transparent
					side={THREE.DoubleSide}
					depthWrite={false}
				/>
			</mesh>

			<mesh position={[0, BASE_BOTTOM - 0.05, 0]} receiveShadow>
				<cylinderGeometry args={[CYLINDER_RADIUS_WORLD, CYLINDER_RADIUS_WORLD, 0.1, 64]} />
				<meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.8} />
			</mesh>

			<mesh position={[0, topY, 0]} castShadow>
				<cylinderGeometry args={[CYLINDER_RADIUS_WORLD, CYLINDER_RADIUS_WORLD, 0.08, 64]} />
				<meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.2} />
			</mesh>

			<mesh position={[0, topY + 0.4, 0]} castShadow>
				<cylinderGeometry args={[0.12, 0.12, 0.8, 24]} />
				<meshStandardMaterial color="#94a3b8" metalness={0.3} roughness={0.4} />
			</mesh>
		</group>
	)
}

function BoyleScene({ lengthCm, pressure }: { lengthCm: number, pressure: number }) {
	const heightWorld = lengthCm * LENGTH_TO_WORLD
	const basePlateY = BASE_BOTTOM - 0.15

	return (
		<group>
			<ambientLight intensity={0.8} />
			<directionalLight position={[4, 6, 3]} intensity={1.4} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
			<Environment preset="studio" />

			<mesh position={[0, basePlateY, 0]} receiveShadow castShadow>
				<boxGeometry args={[4, 0.2, 4]} />
				<meshStandardMaterial color="#0f172a" metalness={0.1} roughness={0.8} />
			</mesh>

			<PistonAssembly lengthCm={lengthCm} />
			<AirMolecules heightWorld={heightWorld} pressure={pressure} />

			<ContactShadows position={[0, basePlateY - 0.05, 0]} opacity={0.4} scale={5} blur={2.5} far={5} />
		</group>
	)
}

export default function BoylesLaw() {
	const { t } = useTranslation()
	const [lengthCm, setLengthCm] = useState(INITIAL_LENGTH_CM)

	const stats = useMemo(() => {
		const lengthMeters = lengthCm / 100
		const volumeM3 = BASE_AREA_M2 * lengthMeters
		const pressure = PV_CONSTANT / volumeM3
		const volumeMl = volumeM3 * 1_000_000
		return { pressure, volumeMl, lengthCm }
	}, [lengthCm])

	return (
		<div className="page-enter" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: 'radial-gradient(circle at top, #0f172a 0%, #020617 70%)',
					zIndex: 0,
				}}
			>
				<Canvas camera={{ position: [4, 4, 6], fov: 50 }} shadows>
					<BoyleScene lengthCm={lengthCm} pressure={stats.pressure} />
					<OrbitControls makeDefault minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
				</Canvas>
				<div
					style={{
						position: 'absolute',
						bottom: '2rem',
						left: '50%',
						transform: 'translateX(-50%)',
						background: 'rgba(2, 6, 23, 0.8)',
						backdropFilter: 'blur(8px)',
						padding: '0.5rem 1rem',
						borderRadius: '999px',
						fontSize: '0.85rem',
						color: 'rgba(255,255,255,0.65)',
						pointerEvents: 'none',
						userSelect: 'none',
					}}
				>
					{t('boyle_lab.drag_hint')}
				</div>
			</div>

			<div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, padding: '2rem' }}>
				<header style={{ pointerEvents: 'auto', width: 'fit-content' }}>
					<Link
						to="/experiments"
						className="ghost-button"
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: '0.5rem',
							marginBottom: '1rem',
							padding: '0.5rem 1rem',
							fontSize: '0.9rem',
							background: 'rgba(0,0,0,0.5)',
							backdropFilter: 'blur(4px)',
						}}
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M19 12H5M12 19l-7-7 7-7" />
						</svg>
						{t('boyle_lab.back_to_lab')}
					</Link>
					<h1 style={{ margin: 0, fontSize: '2.5rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>{t('boyle_lab.title')}</h1>
					<p style={{ maxWidth: '32rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{t('boyle_lab.subtitle')}</p>
				</header>

				<div
					style={{
						position: 'absolute',
						top: '50%',
						right: '2rem',
						transform: 'translateY(-50%)',
						width: '360px',
						maxHeight: 'calc(100vh - 4rem)',
						overflowY: 'auto',
						pointerEvents: 'auto',
						background: 'rgba(2, 6, 23, 0.85)',
						padding: '1.8rem',
						borderRadius: '1.5rem',
						border: '1px solid rgba(148, 163, 184, 0.25)',
						backdropFilter: 'blur(20px)',
						display: 'flex',
						flexDirection: 'column',
						gap: '1.5rem',
						boxShadow: '0 20px 40px rgba(2, 6, 23, 0.6)',
					}}
				>
					<div>
						<label style={{ display: 'block', marginBottom: '0.8rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 600 }}>
							{t('boyle_lab.piston_label')}
						</label>
						<input
							type="range"
							min={MIN_LENGTH_CM}
							max={MAX_LENGTH_CM}
							value={lengthCm}
							step={0.1}
							onChange={(event) => setLengthCm(Number(event.target.value))}
							style={{ width: '100%', accentColor: '#38bdf8', height: '6px', borderRadius: '3px', cursor: 'pointer' }}
						/>
						<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
							<span>{t('boyle_lab.length_readout', { value: MIN_LENGTH_CM.toFixed(0) })}</span>
							<span style={{ color: '#38bdf8', fontWeight: 600 }}>{t('boyle_lab.length_readout', { value: lengthCm.toFixed(1) })}</span>
							<span>{t('boyle_lab.length_readout', { value: MAX_LENGTH_CM.toFixed(0) })}</span>
						</div>
					</div>

					<div style={{ height: '1px', background: 'rgba(148,163,184,0.2)' }} />

					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
						<div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
							<p style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.8)' }}>{t('boyle_lab.pressure_label')}</p>
							<p style={{ margin: '0.2rem 0 0', fontSize: '1.8rem', fontWeight: 600 }}>{t('boyle_lab.pressure_value', { value: stats.pressure.toFixed(2) })}</p>
						</div>
						<div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
							<p style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.8)' }}>{t('boyle_lab.volume_label')}</p>
							<p style={{ margin: '0.2rem 0 0', fontSize: '1.8rem', fontWeight: 600 }}>{t('boyle_lab.volume_value', { value: stats.volumeMl.toFixed(0) })}</p>
						</div>
					</div>

					<div style={{ padding: '1rem', borderRadius: '1.2rem', background: 'rgba(8, 47, 73, 0.6)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
						<p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(224, 242, 254, 0.9)' }}>{t('boyle_lab.molecules_caption')}</p>
						<p style={{ margin: '0.4rem 0 0', fontSize: '0.85rem', color: 'rgba(224, 242, 254, 0.6)', lineHeight: 1.5 }}>{t('boyle_lab.description')}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
