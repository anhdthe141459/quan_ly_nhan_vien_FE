import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Image, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

const ImageUploader= forwardRef((props,ref) => {
    
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [uploadKey, setUploadKey] = useState(0);
    const [listFile, setListFile] = useState(null);
    useImperativeHandle(ref, () => {
        return previewImage; // Trả về giá trị từ useState
      });
    const handleFileChange = (info) => {
    const file = info.fileList[0]?.originFileObj; // Lấy file từ fileList

    if (file) { // Kiểm tra nếu file có `originFileObj`
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Cập nhật ảnh xem trước
      };
      reader.readAsDataURL(file); // Đọc file dưới dạng base64
    } else if (info.fileList.length === 0) {
      setPreviewImage(null); // Xóa ảnh xem trước khi không có file
      setListFile(null);
    }
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Cấu hình component Upload
  const uploadProps = {
    maxCount: 1, // Giới hạn chỉ một ảnh
    beforeUpload: () => false, // Ngăn tải lên tự động
    onPreview: handlePreview, 
    onChange: handleFileChange,
    defaultFileList:listFile
  };

  useEffect(() => {
    const defaultFileList = props.avatar?[
      {
        uid: '-1', // Cần một uid duy nhất
        name: 'default-image.jpg', // Tên của ảnh
        status: 'done', // Trạng thái 'done' để hiển thị ảnh
        url: props.avatar, // URL của ảnh mặc định
      },
    ]:null;
    if(defaultFileList!=null){
      setListFile(defaultFileList);
      setUploadKey((prevKey) => prevKey + 1);
    }
    
  }, [props.avatar]); 

  
  return (
    <div>
      <Upload key={uploadKey} {...uploadProps} listType="picture-card">
        {(previewImage||listFile) ? null : (
          <div>
            <UploadOutlined style={{ fontSize: 24 }} />
            <div style={{ marginTop: 8 }}>Chọn ảnh</div>
          </div>
        )}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            // afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
      {/* {previewImage && (
        <img src={previewImage} alt="Xem trước" style={{ width: "200px", marginTop: "10px" }} />
      )} */}
    </div>
  );
});

export default ImageUploader;
