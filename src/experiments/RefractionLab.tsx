import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, Line, Environment, ContactShadows, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'
import '../App.css'

const MATERIALS = [
  { name: 'Air', n: 1.00, color: '#ffffff', opacity: 0.1 },
  { name: 'Water', n: 1.33, color: '#38bdf8', opacity: 0.4 },
  { name: 'Glass', n: 1.50, color: '#a855f7', opacity: 0.6 },
  { name: 'Diamond', n: 2.42, color: '#e2e8f0', opacity: 0.8 },
]

function LaserBeam({ start, end, color = '#f43f5e', opacity = 1, width = 3 }: { start: THREE.Vector3, end: THREE.Vector3, color?: string, opacity?: number, width?: number }) {
  return (
    <Line
      points={[start, end]}
      color={color}
      lineWidth={width}
      transparent
      opacity={opacity}
      toneMapped={false}
    />
  )
}

function Label({ position, target, children, color = 'white' }: { position: [number, number, number], target: [number, number, number], children: React.ReactNode, color?: string }) {
  const points = useMemo(() => {
    const pos = new THREE.Vector3(...position)
    const tgt = new THREE.Vector3(...target)
    
    // Calculate elbow for "hockey stick" line
    // Horizontal segment from text to elbow
    const xDir = tgt.x > pos.x ? 1 : -1
    const dist = Math.abs(tgt.x - pos.x)
    const elbowLen = Math.min(1.0, dist * 0.5)
    const elbow = new THREE.Vector3(pos.x + xDir * elbowLen, pos.y, pos.z)
    
    return [pos, elbow, tgt]
  }, [position, target])
  
  return (
    <group>
      <Html position={position} center zIndexRange={[100, 0]}>
        <div style={{ 
          color: color === 'white' ? 'rgba(255,255,255,0.9)' : color, 
          fontFamily: 'var(--font-sans)', 
          fontSize: '0.9rem', 
          fontWeight: 500,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          padding: '4px 12px',
          borderRadius: '8px',
          border: `1px solid ${color === 'white' ? 'rgba(255,255,255,0.1)' : 'rgba(244, 63, 94, 0.3)'}`,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          {children}
        </div>
      </Html>
      <Line 
        points={points} 
        color={color} 
        lineWidth={1} 
        transparent
        opacity={0.4}
      />
      <mesh position={target}>
        <sphereGeometry args={[0.05]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

function Scene({ n1, n2, angle }: { n1: number, n2: number, angle: number }) {
  const { theta2, isTIR, reflectance } = useMemo(() => {
    const theta1Rad = (angle * Math.PI) / 180
    const sinTheta2 = (n1 * Math.sin(theta1Rad)) / n2

    if (Math.abs(sinTheta2) >= 1) {
      return { theta2: 0, isTIR: true, reflectance: 1 }
    }

    const theta2Rad = Math.asin(sinTheta2)
    
    // Fresnel Equations
    const cosTheta1 = Math.cos(theta1Rad)
    const cosTheta2 = Math.cos(theta2Rad)
    
    const rs = Math.pow((n1 * cosTheta1 - n2 * cosTheta2) / (n1 * cosTheta1 + n2 * cosTheta2), 2)
    const rp = Math.pow((n1 * cosTheta2 - n2 * cosTheta1) / (n1 * cosTheta2 + n2 * cosTheta1), 2)
    
    return { theta2: theta2Rad, isTIR: false, reflectance: (rs + rp) / 2 }
  }, [n1, n2, angle])

  const rayLength = 100
  const theta1Rad = (angle * Math.PI) / 180

  // Incident Ray (Top)
  const startVec = new THREE.Vector3(
    -Math.sin(theta1Rad) * rayLength,
    Math.cos(theta1Rad) * rayLength,
    0
  )
  const origin = new THREE.Vector3(0, 0, 0)

  // Reflected Ray (Top)
  const reflectVec = new THREE.Vector3(
    Math.sin(theta1Rad) * rayLength,
    Math.cos(theta1Rad) * rayLength,
    0
  )

  const mat2 = MATERIALS.find(m => m.n === n2) || MATERIALS[1]

  // --- New Ray Tracing Logic ---
  const blockHeight = 3
  const blockWidth = 10
  const maxRayLen = 50
  
  // Calculate intersection with boundaries
  // Ray starts at (0,0,0) and goes in direction (sin(theta2), -cos(theta2))
  // Boundaries: y = -3 (bottom), x = 5 (right), x = -5 (left)
  
  let exitPoint = new THREE.Vector3(0, -blockHeight, 0)
  let exitNormal = new THREE.Vector3(0, 1, 0) // Normal pointing IN to the block at exit surface

  if (!isTIR) {
    const tanTheta2 = Math.tan(theta2)
    const xAtBottom = tanTheta2 * blockHeight
    
    if (Math.abs(xAtBottom) > blockWidth / 2) {
      // Hits side wall
      const sideX = (theta2 > 0 ? 1 : -1) * (blockWidth / 2)
      // y = x / tan(theta2) -> but y is negative
      const sideY = -Math.abs(sideX / tanTheta2)
      
      exitPoint.set(sideX, sideY, 0)
      exitNormal.set(theta2 > 0 ? -1 : 1, 0, 0)
    } else {
      // Hits bottom
      exitPoint.set(xAtBottom, -blockHeight, 0)
      exitNormal.set(0, 1, 0)
    }
  }

  // Calculate Exit Ray Direction
  // Snell's Law at exit: n2 * sin(theta_i) = n1 * sin(theta_exit)
  // We need angle of incidence relative to the exit surface normal
  
  let exitVec = new THREE.Vector3()
  let isExitTIR = false

  if (!isTIR) {
    // Incident vector inside block
    const incidentDir = new THREE.Vector3(Math.sin(theta2), -Math.cos(theta2), 0).normalize()
    
    // Angle between incident ray and surface normal (both pointing roughly opposite or same? Normal points IN)
    // cos(theta_i) = dot(-incidentDir, exitNormal)
    const cosThetaI = -incidentDir.dot(exitNormal)
    const thetaI = Math.acos(cosThetaI)
    
    const sinThetaExit = (n2 * Math.sin(thetaI)) / n1
    
    if (Math.abs(sinThetaExit) >= 1) {
      isExitTIR = true
    } else {
      const thetaExit = Math.asin(sinThetaExit)
      
      // Construct exit vector
      // We need to rotate the normal by thetaExit. Direction depends on which side of normal we are.
      // Cross product z component tells us "handedness"
      
      // Actually, simpler:
      // If we hit bottom (normal 0,1), ray is going down-right. 
      // If we hit right side (normal -1,0), ray is going down-right.
      
      // Let's use 2D rotation of the normal vector.
      // The exit ray should be bent AWAY from normal if n2 > n1.
      // Angle of exit ray w.r.t normal is thetaExit.
      // We just need to know if it's clockwise or counter-clockwise from normal.
      // The incident ray came from "left" of normal or "right"?
      
      // Vector math approach:
      // Tangent vector T perpendicular to N.
      // I = N * cos(thetaI) + T * sin(thetaI)  (Incident, reversed)
      // E = -N * cos(thetaExit) + T * sin(thetaExit)
      
      // Let's find T. T is in the plane, perpendicular to N.
      // Project I onto surface: I_surf = I - (I.N)N
      // T = I_surf.normalize()
      
      const proj = incidentDir.clone().sub(exitNormal.clone().multiplyScalar(incidentDir.dot(exitNormal)))
      const tangent = proj.normalize()
      
      // Exit vector:
      // Component along Normal (outwards): -N * cos(thetaExit)
      // Component along Tangent: T * sin(thetaExit)
      
      // Wait, normal points IN. So outward normal is -N.
      // Outward component is (-N) * cos(thetaExit).
      
      const outwardNormal = exitNormal.clone().negate()
      exitVec.copy(outwardNormal).multiplyScalar(Math.cos(thetaExit))
        .add(tangent.multiplyScalar(Math.sin(thetaExit)))
        .normalize()
        .multiplyScalar(maxRayLen)
        .add(exitPoint)
    }
  }

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Incident Ray */}
      <LaserBeam start={startVec} end={origin} />
      
      {/* Refracted Ray (Internal) */}
      {!isTIR && (
        <>
          <LaserBeam 
            start={origin} 
            end={exitPoint} 
            opacity={Math.max(0.4, 1 - reflectance)} 
          />
          {/* Exit Ray */}
          {!isExitTIR ? (
            <LaserBeam 
              start={exitPoint} 
              end={exitVec} 
              opacity={Math.max(0.3, (1 - reflectance) * 0.8)} 
            />
          ) : (
             // Internal Reflection at exit surface (simplified visualization)
             <LaserBeam 
               start={exitPoint} 
               end={exitPoint.clone().add(new THREE.Vector3(0, 2, 0))} // Just show it bounces back
               opacity={0.5}
               color="#f43f5e"
             />
          )}
        </>
      )}

      {/* Reflected Ray */}
      <LaserBeam 
        start={origin} 
        end={reflectVec} 
        opacity={Math.min(1, 0.2 + reflectance * 1.5)} 
        width={2 + reflectance * 8} 
      />

      {/* Normal Line */}
      <Line
        points={[new THREE.Vector3(0, 3, 0), new THREE.Vector3(0, -3, 0)]}
        color="white"
        lineWidth={1}
        dashed
        dashScale={2}
        opacity={0.3}
        transparent
      />

      {/* Medium 2 Block */}
      <mesh position={[0, -1.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[blockWidth, blockHeight, 2]} />
        <meshPhysicalMaterial
          color={mat2.color}
          transmission={0} 
          opacity={0.3}
          metalness={0.1}
          roughness={0.1}
          ior={1.5}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Labels */}
      <Label position={[-4, 1.5, 0]} target={[-1.5, 0.5, 0]}>
        n<sub>1</sub> = {n1.toFixed(2)}
      </Label>

      <Label position={[-4, -1.5, 0]} target={[-1.5, -0.5, 0]}>
        n<sub>2</sub> = {n2.toFixed(2)}
      </Label>
      
      {isTIR && (
        <Label position={[4, 2, 0]} target={[0, 0, 0]} color="#f43f5e">
          Total Internal Reflection
        </Label>
      )}

      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
    </group>
  )
}

export default function RefractionLab() {
  const [n1, setN1] = useState(1.00)
  const [n2, setN2] = useState(1.33)
  const [angle, setAngle] = useState(45)

  return (
    <div className="page-enter" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Viewport (Fullscreen Background) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, #1a103c 0%, #05030a 100%)',
        zIndex: 0
      }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} shadows>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Environment preset="city" />
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Scene n1={n1} n2={n2} angle={angle} />
          </Float>
          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.5} />
        </Canvas>
        
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          padding: '0.5rem 1rem',
          borderRadius: '999px',
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.6)',
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          Drag to rotate • Scroll to zoom
        </div>
      </div>

      {/* UI Overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, padding: '2rem' }}>
        <header style={{ pointerEvents: 'auto', width: 'fit-content' }}>
          <Link to="/experiments" className="ghost-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Lab
          </Link>
          <h1 style={{ margin: 0, fontSize: '2.5rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>Light Refraction Tank</h1>
        </header>

        {/* Controls Panel */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '2rem',
          transform: 'translateY(-50%)',
          width: '320px',
          maxHeight: 'calc(100vh - 4rem)',
          overflowY: 'auto',
          pointerEvents: 'auto',
          background: 'rgba(13, 7, 17, 0.75)',
          padding: '1.5rem',
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 600 }}>Incident Angle</label>
            <input 
              type="range" 
              min="0" 
              max="89" 
              value={angle} 
              onChange={(e) => setAngle(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#c084fc', height: '6px', borderRadius: '3px', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.3rem' }}>
              <span>0°</span>
              <span style={{ color: '#c084fc', fontWeight: 600 }}>{angle}°</span>
              <span>90°</span>
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />

          <div>
            <label style={{ display: 'block', marginBottom: '0.8rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 600 }}>Medium 1 (Top)</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {MATERIALS.map((m) => (
                <button
                  key={m.name}
                  onClick={() => setN1(m.n)}
                  className={`experiments-page__filter ${n1 === m.n ? 'is-active' : ''}`}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem' }}
                >
                  {m.name}
                </button>
              ))}
            </div>
            <input 
              type="range" 
              min="1.00" 
              max="2.50" 
              step="0.01" 
              value={n1} 
              onChange={(e) => setN1(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#c084fc', height: '6px', borderRadius: '3px', cursor: 'pointer' }}
            />
            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.3rem' }}>Index (n) = {n1.toFixed(2)}</div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.8rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 600 }}>Medium 2 (Bottom)</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {MATERIALS.map((m) => (
                <button
                  key={m.name}
                  onClick={() => setN2(m.n)}
                  className={`experiments-page__filter ${n2 === m.n ? 'is-active' : ''}`}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem' }}
                >
                  {m.name}
                </button>
              ))}
            </div>
            <input 
              type="range" 
              min="1.00" 
              max="2.50" 
              step="0.01" 
              value={n2} 
              onChange={(e) => setN2(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#38bdf8', height: '6px', borderRadius: '3px', cursor: 'pointer' }}
            />
            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.3rem' }}>Index (n) = {n2.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
