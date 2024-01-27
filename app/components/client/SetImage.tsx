"use client"

import UploadcareImage from '@uploadcare/nextjs-loader';
import { getBlurDataURL } from '@uploadcare/nextjs-loader';

/**
 * This is react component that renders an image from uploadcare
 * @param {string} props.uuid - uuid of the image
 * @param {string} props.name - name of the image
 * @param {number} props.width - width of the image
 * @param {number} props.height - height of the image
 * @param {boolean} props.crop - if true, the image will be cropped, if false, the image will be resized
 * @returns {JSX.Element} - returns an image
*/
export default function SetImage({className, uuid, name, width, height, crop=false} : { className?: string, uuid:string | null, name: string, width: number, height: number, crop?: boolean}) {

    const backup = "4a946bab-90b1-4b70-8028-94a73bb9f536"
    const resizing = `https://ucarecdn.com/${uuid? uuid: backup}/-/progressive/yes/-/preview/-/smart_resize/${width}x${height}/`
    const cropping= `https://ucarecdn.com/${uuid? uuid: backup}/-/progressive/yes/-/preview/-/scale_crop/${width}x${height}/smart_objects/center/`
    const blur = `https://ucarecdn.com/${uuid? uuid: backup}/-/preview/-/quality/lightest/-/blur/100/-/smart_resize/${width}x${height}/`

    return (
        <>
            {uuid
            ?<UploadcareImage
            className={className}
            alt={`${name} image`}
            src={crop? cropping: resizing}
            width={width}
            height={height}
            placeholder='blur'
            blurDataURL={blur}
            />
            :<UploadcareImage
            className={className}
            alt="Backup Image"
            src={crop? cropping: resizing}
            width={width}
            height={height}
            placeholder='blur'
            blurDataURL={blur}
            />
            }
        </>
    )
}
