<template>
  <div class="tw-my-[12px]">
    <div class="file_list">
      <div
        v-for="(item, index) in props.modelValue"
        :key="item.id"
        class="file_list_item">
        <div
          class="file_list_item-icon"
          :class="item.fileIcon"></div>
        <p
          class="file_list_item-name"
          :title="item.name">
          {{ item.name }}
        </p>

        <img
          v-if="!readonly"
          class="file_list_item-delete"
          src="@/assets/images/upload-file/button_close.png"
          alt=""
          @click="handleDelete(item, index)" />
      </div>
    </div>
    <van-uploader
      v-if="!readonly"
      accept="*"
      class="tw-mt-[12px]"
      :preview-image="false"
      :show-upload="!readonly"
      :before-read="handleBeforeRead"
      :after-read="handleAfterRead"
      :max-size="100 * 1024 * 1024"
      :max-count="1"
      @oversize="handleOversize">
      <img
        class="upload_icon"
        src="@/assets/images/upload-file/button_add.png"
        alt="" />
    </van-uploader>
  </div>
</template>

<script setup>
  import { uploadFile } from '@/api'
  import { Dialog, Toast } from 'vant'

  const props = defineProps({
    modelValue: {
      type: Array,
      default() {
        return []
      }
    },
    readonly: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue'])

  function handleBeforeRead() {
    return true
  }

  const getFileIcon = (type) => {
    let fileIcon = ''

    switch (type) {
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        fileIcon = 'excel'
        break
      case 'image/gif':
      case 'image/jpeg':
      case 'image/png':
      case 'image/bmp':
        fileIcon = 'image'
        break
      case 'application/pdf':
        fileIcon = 'pdf'
        break
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        fileIcon = 'ppt'
        break
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        fileIcon = 'word'
        break
      default:
        fileIcon = 'unknown'
        break
    }

    return fileIcon
  }

  function handleAfterRead({ file }) {
    uploadFile({
      file,
      tag: 'file'
    })
      .then((res) => {
        if (res.data.code === 0) {
          emit('update:modelValue', [
            ...props.modelValue,
            { ...res.data.data, fileIcon: getFileIcon(file.type), name: file.name }
          ])
        } else {
          Toast(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function handleOversize() {
    Toast('文件大小不能超过10M')
  }

  function handleDelete(file, index) {
    console.log(file, index)
    Dialog.confirm({
      title: '确认',
      message: `确认删除文件：${file.name} 吗？`,
      confirmButtonColor: '#3189FF'
    })
      .then(() => {
        emit(
          'update:modelValue',
          props.modelValue.filter((item, itemIndex) => {
            return itemIndex !== index
          })
        )
      })
      .catch(() => {
        Toast('已取消')
      })
  }
</script>

<style lang="scss" scoped>
  .file_list {
    &_item {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 64px;
      padding: 12px 16px;
      margin-bottom: 12px;
      border-radius: 6px;
      background-color: #f2f2f2;
      &:last-child {
        margin-bottom: 0;
      }
      &-icon {
        width: 40px;
        height: 40px;
        background-repeat: no-repeat;
        background-size: 100%;
        &.excel {
          background-image: url('@/assets/images/upload-file/icon_excel.png');
        }
        &.image {
          background-image: url('@/assets/images/upload-file/icon_image.png');
        }
        &.pdf {
          background-image: url('@/assets/images/upload-file/icon_pdf.png');
        }
        &.ppt {
          background-image: url('@/assets/images/upload-file/icon_ppt.png');
        }
        &.unknown {
          background-image: url('@/assets/images/upload-file/icon_unknown.png');
        }
        &.word {
          background-image: url('@/assets/images/upload-file/icon_word.png');
        }
      }
      &-name {
        flex: 1;
        margin-left: 16px;
        color: #4a4a4a;
        font-size: 16px;
        font-weight: 600;
        word-break: break-all;
        @apply tw-line-clamp-1;
      }
      &-delete {
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 24px;
      }
    }
  }

  .upload_icon {
    width: 64px;
    height: 64px;
  }
</style>
