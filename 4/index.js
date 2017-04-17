"use strict";

const fs = require("fs"),
  crypto = require('crypto'),
  inputName = "input.txt",
  outputSimpleName = "output1.txt",
  outputTransformName = "output2.txt",
  Transform = require("stream").Transform,
  Readable = require("stream").Readable,
  Writable = require("stream").Writable;

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

fs.access(inputName, fs.constants.R_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.log('403 error');
  }
  else {
    /*Часть 1*/
    
    const input = fs.createReadStream(inputName);
    const outputSimple = fs.createWriteStream(outputSimpleName);
    const hash = crypto.createHash('md5');
    input.pipe(hash).pipe(process.stdout);
    input.pipe(hash).pipe(outputSimple);
    
    /*Часть 2*/
    const outputTransform = fs.createWriteStream(outputTransformName);
    const MyTransform1 = new TransformClass1;
    input.pipe(MyTransform1).pipe(process.stdout);
    input.pipe(MyTransform1).pipe(outputTransform);
    
    /*Дополнительное задание*/
    const MyTransform2 = new TransformClass2;
    const MyReadable = new ReadableClass;
    const MyWritable = new WritableClass;
    MyReadable.pipe(MyTransform2).pipe(MyWritable);
  }
});

class ReadableClass extends Readable {
  _read() {
    this.push(randInt(0, 100).toString());
  }
}

class WritableClass extends Writable {
  _write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
}

class TransformClass1 extends Transform {
  constructor(options) {
    super(options);
    this.hash = crypto.createHash('md5');
  }
  
  _transform(chunk, encoding, callback) {
    chunk = chunk.toString('hex');
    this.hash.push(chunk);
    callback();
  }
  
  _flush(callback) {
    let hex = this.hash.digest('hex');
    this.push(hex);
    callback();
  }
}

class TransformClass2 extends Transform {
  modify(str) {
    str = `\n${Number(str) << 2}`;
    return str;
  }
  
  _transform(chunk, encodind, callback) {
    setTimeout(() => {
      this.push(this.modify(chunk.toString()));
      callback();
    }, 1000);
  }
}