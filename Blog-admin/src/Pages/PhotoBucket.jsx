import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;


function PhotoBucket() {
  const props = {
    name: 'file',
    multiple: true,
    action: 'http://127.0.0.1:7001/admin/uploadImg',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或者将图片拖拽到该区域进行图片上传</p>
        <p className="ant-upload-hint">
          支持单个或批量上传
    </p>
      </Dragger>,
    </div>

  )
}

export default PhotoBucket