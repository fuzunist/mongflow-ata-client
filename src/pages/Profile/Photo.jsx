import DefaultUser from '@/assets/img/default_user.png'
import ImageCropper from '@/components/ImageCropper'
import Modal from '@/components/Modal'
import { changePhotoFromDB } from '@/services/auth'
import { setPhoto } from '@/store/actions/user'
import { imageToBase64 } from '@/utils/helpers'
import { UploadIcon } from 'lucide-react'
import { useState } from 'react'

const Photo = ({ photo, t, user }) => {
    const [image, setImage] = useState(null)
    const [cropped, setCropped] = useState({ croppedArea: null, croppedAreaPixels: null })

    const onClick = async () => {
        const croppedImage = imageToBase64(image, cropped.croppedAreaPixels)
        const response = await changePhotoFromDB(user.tokens.access_token, croppedImage)
        if (response?.error) return console.log(response.error)
        setPhoto(croppedImage)
        setImage(null)
    }

    return (
        <div className='w-24 h-24 relative'>
            <div className='absolute rounded-full bottom-0 right-0 bg-link-fg-light hover:bg-link-hover-light text-white flex justify-center items-center select-none'>
                <input
                    type='file'
                    className='w-8 h-8 rounded-full bg-link-fg-light hover:bg-link-hover-light opacity-0 cursor-pointer'
                    accept='.jpg,.jpeg,.png'
                    onChange={(e) => setImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null)}
                />
                <UploadIcon
                    size={18}
                    strokeWidth={3}
                    className='absolute pointer-events-none'
                />
            </div>
            <img
                src={photo || DefaultUser}
                className='w-24 h-24 rounded-full'
            />
            <Modal
                directRender={!!image}
                closeModal={() => setImage(null)}
            >
                <div className='flex flex-col justify-start items-center'>
                    <div className='w-96 h-96 relative'>
                        <ImageCropper
                            image={image}
                            onCropComplete={(croppedArea, croppedAreaPixels) => setCropped({ croppedArea, croppedAreaPixels })}
                        />
                    </div>
                    <button
                        className='bg-link-fg-light hover:bg-link-hover-light py-2 px-4 rounded mt-4 text-white'
                        onClick={onClick}
                    >
                        {t('save')}
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default Photo
