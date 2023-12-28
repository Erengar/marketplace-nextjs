'use client' // is needed only if you’re using React Server Components
import * as LR from '@uploadcare/blocks';

LR.registerBlocks(LR);

export default function UploadCare() {
  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        pubkey="53aaac8de5aec62c6e9c"
      />
      <lr-file-uploader-minimal
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@${LR.PACKAGE_VERSION}/web/lr-file-uploader-regular.min.css`}
      />
    </div>
  );
}