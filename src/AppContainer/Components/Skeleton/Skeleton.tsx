import React from 'react'
import './Skeleton.css'

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = observer(({ width = '100%', height = '20px' }) => {
    const skeletonStyle: React.CSSProperties = {
        position: 'relative',
        width: width,
        height: height,
        backgroundColor: 'rgb(215,215,215)', // Fond gris clair classique
        borderRadius: '15px', // Arrondi pour un look plus esthétique
        // marginBottom: '10px', 
        // Espacement entre chaque Skeleton
        overflow: 'hidden',
    }

    const highlightStyle: React.CSSProperties = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.6) 55%, rgba(255, 255, 255, 0) 70%)',
        animation: 'shimmer 3s infinite',
    }

    return (
        <div style={skeletonStyle}>
            <div style={highlightStyle}></div>
        </div>
    )
})

export default Skeleton
