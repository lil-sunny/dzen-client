<script>
export default {
    props: {
        name: String,
        text: String,
        avatar: String,
    }
}
</script>

<template>
    <div class="comment-wrapper flex">
          <div class="image-wrapper mr-2">
            <div class="avatar rounded-full overflow-hidden w-[45px] h-[45px]">
              <img
                src="https://www.tryparrotai.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fparrot-prod-21b3c.appspot.com%2Fo%2Fcommunity%252FcoverPhotos%252F14992f96-5d18-48e3-96c4-7997996cd039%3Falt%3Dmedia%26token%3D76a86f97-01df-4ebf-ac76-0af5bb045616&w=828&q=75"
                alt=""
              />
            </div>
          </div>
          <div class="message-wrapper flex w-full">
             <div class="triagle-wrapper relative w-[12px] pt-2"> 
              <div class="triagle top-0 w-[12px]">
                <svg viewBox="0 0 80 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 51L80 0V92L0 51Z" fill="#209ad3" />
                </svg>
              </div>
            </div>
            <div class="message w-full overflow-hidden rounded-[10px] shadow-2xl">
                <div class="message-header bg-[#209ad3] py-1 px-3">
                    <span class="text-md text-white">Stephen Ainsworth</span>
                </div>
                <div class="message-text bg-[#27354e] py-2 px-3">
                    <span class="text-md text-white">Stephen Ainsworth</span>
                </div>
            </div>
          </div>
        </div>
</template>
