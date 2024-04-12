import React, { useState, useEffect } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { useAuth } from '../contexts/AuthContext';
import { Button, Form, InputGroup, FormControl, Col } from 'react-bootstrap';

function TickIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="red" 
        fillRule="evenodd"
        d="M20 6L9 17 4.8 12.7 4 13.4l5.6 5.6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ImageCapture() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { currentUser } = useAuth();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const s3Client = new S3Client({
        region: 'us-east-1', // Replace with your S3 bucket region
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, // Replace with your actual key
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        }// Provide your AWS credentials or configuration here
      });

      const filename = `${currentUser.email}-${Date.now()}-${currentUser.uid}`;
      const folderPath = 'upload/'; // Add your desired folder path

      if (selectedFile.type === 'image/heic') {
        const reader = new FileReader();
        const imagePromise = new Promise((resolve, reject) => {
          reader.onload = (event) => {
            const image = new Image();
            image.onload = () => {
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              canvas.width = image.width;
              canvas.height = image.height;
              context.drawImage(image, 0, 0);
              canvas.toDataURL('image/jpeg', (dataURL) => {
                const blob = dataURItoBlob(dataURL);
                resolve(blob);
              });
            };
            image.onerror = reject;
            image.src = event.target.result;
          };
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });

        const convertedFile = await imagePromise;
        await uploadToS3(s3Client, folderPath + filename, convertedFile);
      } else {
        await uploadToS3(s3Client, folderPath + filename, selectedFile);
      }

      console.log('Image uploaded successfully!');
      setSelectedFile(null); // Clear state after successful upload
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const parts = dataURI.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const byteString = atob(parts[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: contentType });
  };

  const uploadToS3 = async (s3Client, filename, file) => {
    const putParams = {
      Bucket: 'splitwiseocr', // Replace with your S3 bucket name
      Key: filename,
      Body: file,
    };

    try {
      await s3Client.send(new PutObjectCommand(putParams));
    } catch (error) {
      throw error; // Re-throw for handling in main upload function
    }
  };

  return (
    <div className="image-capture">
      <h2 className="text-center mb-4" style={{ color: 'black' }}>Upload Your Image</h2>
      <Form>
        <InputGroup className="mb-3">
          <FormControl
            type="file"
            id="imageFile"
            label="Image File"
            onChange={handleFileChange}
            accept="image/*"
            custom
          />
          <Form.Label htmlFor="imageFile"></Form.Label>
        </InputGroup>
        {selectedFile && (
          <p>Selected file: {selectedFile.name}</p>
        )}
        {uploadError && <p className="text-danger">{uploadError}</p>}
        <Col xs={{ offset: 4, span: 4 }}>
          <Button
            variant="primary"
            disabled={isUploading}
            onClick={handleUpload}
            style={{ backgroundColor: 'white', borderColor: 'white' }}
          >
            {isUploading ? (
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <circle cx="50" cy="50" r="40" fill="#fff" />
                  <circle cx="50" cy="50" r="40" fill="blue" stroke="none" stroke-width="4">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 50 50"
                      to="360 50 50"
                      dur="0.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </span>
            ) : (
              <TickIcon />
            )}
          </Button>
        </Col>
      </Form>
    </div>
  );
}

export default ImageCapture;
