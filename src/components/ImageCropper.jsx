import { useState } from 'react'
import Cropper from 'react-easy-crop'

const ImageCropper = ({ image, onCropComplete, aspect = 1 }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    return (
        <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropSize={{ width: 128, height: 128 }}
        />
    )
}

export default ImageCropper
