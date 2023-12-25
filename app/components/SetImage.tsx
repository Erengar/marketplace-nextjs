"use client";
import UploadcareImage from '@uploadcare/nextjs-loader';


export default function SetImage({uuid, name, width, height} : {uuid:string, name: string | undefined, width: number, height: number}) {
    return (
        <>
            <UploadcareImage
            alt={`${name} image`}
            src={`https://ucarecdn.com/${uuid}/-/preview/500x500/-/quality/smart/-/format/auto/`}
            width={width}
            height={height}
            />
        </>
    )
}