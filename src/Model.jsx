import React, { useRef, useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import yolo_process from './utils/yolov8_process';
import drawBoundingBox from './utils/drawBoundingBox';
import saveCanvasImage from './utils/saveImage';
import toggleCamera from './utils/toggleCamera';
import Search from './Search';
import './Model.css';

const Model = () => {
  const fileInputRef = useRef();
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [model, setModel] = useState(null);
  const [info, setInfo] = useState('Please Load model.');
  const [infoColor, setInfoColor] = useState('black');
  const [selectedModel, setSelectedModel] = useState('cocoSsd');
  const [predictions, setPredictions] = useState([]);
  const [detectionError, setDetectionError] = useState(false); // State to handle detection error

  const loadModel = useCallback(async () => {
    setInfo('Loading model...');
    setInfoColor('red');
    let loadedModel;
    try {
      switch (selectedModel) {
        case 'cocoSsd':
          loadedModel = await cocoSsd.load();
          break;
        case 'yolov8n':
          loadedModel = await tf.loadGraphModel(
            `${window.location.href}/yolov8n_web_model/model.json`
          );
          loadedModel.execute(tf.ones(loadedModel.inputs[0].shape)); // Warm up model
          break;
        default:
          throw new Error('Model not supported.');
      }
      setModel(loadedModel);
      setInfo('Model loaded');
      setInfoColor('green');
      setButtonDisabled(false);
    } catch (error) {
      setInfo('Error loading model');
      setInfoColor('red');
      console.error('Error loading model:', error);
    }
  }, [selectedModel]);

  // Reset summaries and predictions when a new image is uploaded or webcam toggled
  const resetState = () => {
    setPredictions([]);
    setDetectionError(false);
  };

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    const imgel = document.getElementById('input-img');
    imgel.src = URL.createObjectURL(file);
    await imgel.decode();

    resetState(); // Clear previous predictions and summaries

    try {
      let predict;
      switch (selectedModel) {
        case 'cocoSsd':
          predict = await model.detect(imgel);
          break;
        case 'yolov8n':
          predict = await yolo_process(model, imgel.width, imgel.height, imgel);
          break;
        default:
          throw new Error('Model not supported for prediction.');
      }

      if (predict.length === 0) {
        setPredictions(predict);
        drawBoundingBox(predict, imgel, imgel.width, imgel.height);
        setSaveButtonDisabled(false);
        setDetectionError(true); // Set error state if no objects were detected
      } else {
        setPredictions(predict);
        drawBoundingBox(predict, imgel, imgel.width, imgel.height);
        setSaveButtonDisabled(false);
        setDetectionError(false); // Reset error state if objects are detected
      }

    } catch (error) {
      console.error('Error making predictions:', error);
      setInfo('Error making predictions');
      setInfoColor('red');
    }
  }, [model, selectedModel]);

  const handleCameraToggle = useCallback(() => {
    resetState(); // Clear previous predictions when webcam is opened/closed
    toggleCamera(model, selectedModel);
  }, [model, selectedModel]);

  return (
    <>
      <h2>Object Detection System</h2>
      <div id='info-container'>
        <p>
          Model: <span id='model-info'>{selectedModel}</span>
        </p>
        <select
          className='select'
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="cocoSsd">Coco-SSD</option>
          <option value="yolov8n">YOLOv8n</option>
        </select>
      </div>
      <canvas id='objdetect-canvas'></canvas>
      <img id='input-img' src="" hidden />
      <video id="input-camera" autoPlay hidden></video>
      <div id='btn-container'>
        <button
          id='openimg-btn'
          className='btn'
          onClick={() => fileInputRef.current.click()}
          disabled={buttonDisabled}
        >
          Open Image
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/jpeg, image/png"
            style={{ display: 'none' }}
          />
        </button>
        <button
          id='saveimg-btn'
          className='btn'
          onClick={saveCanvasImage}
          disabled={saveButtonDisabled}
        >
          Save Image
        </button>
        <button
          id='opencam-btn'
          className='btn'
          onClick={handleCameraToggle}
          disabled={buttonDisabled}
        >
          Open Webcam
        </button>
      </div>
      <button
        id='load-btn'
        className='btn'
        onClick={loadModel}
      >
        Load Model
      </button>
      <p id='info' style={{ color: infoColor }}>
        {info}
      </p>

      {/* Display error message if no objects were detected */}
      {detectionError && <p style={{ color: 'red' }}>Unable to detect any objects in the image.</p>}

      <div>
        <Search pred={predictions} />
      </div>
    </>
  );
};

export default Model;
