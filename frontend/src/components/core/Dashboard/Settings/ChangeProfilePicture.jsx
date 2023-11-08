import React, { useState , useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FiUpload } from "react-icons/fi"

import {updateDisplayPicture} from "../../../../services/operations/settingApi"
import IconBtn from '../../../common/IconBtn';

import { useRef } from 'react';

export const ChangeProfilePicture = () => {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if(file) {
            setImageFile(file);
            setPreviewImage(file);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        console.log(reader);
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewImage(reader.result)
        }
    }

    const handleFileUpload = () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("displayPicture", imageFile);
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false);
            })
        }
        catch(error) {
            console.log("ERROR MESSAGE : ", error);
        }
    }

    useEffect(() => {
        if (imageFile) {
          previewFile(imageFile)
        }
      }, [imageFile])

  return (
    <>
        <div className="flex items-center justify-between r rounded-md border border-shadowColor shadow-shadowColor bg-white p-8 px-12">
            <div className='flex items-center gap-x-4'>
                <img 
                    src={previewImage || user?.image.image_link} 
                    alt = {user.firsName} 
                    className="aspect-square w-[78px] rounded-full object-cover"
                />
                <div className="space-y-2">
                    <p>Change Profile Picture</p>
                    <div className="flex flex-row gap-3">
                        <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className='hidden'
                            accept='image/png, image/gif, image/jpeg'
                        />
                        <button
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                        onClick={handleClick}
                        >
                            Select
                        </button>

                        <IconBtn 
                        text={loading ? "Uploading..." : "Upload"}
                        onclick={handleFileUpload}
                        >
                            {!loading && (
                                <FiUpload className='text-lg'/>
                            )}
                        </IconBtn>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
