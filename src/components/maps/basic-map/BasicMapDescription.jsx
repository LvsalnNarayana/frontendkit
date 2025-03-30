import React from "react";
import DescriptionLayout from "../../../layouts/DescriptionLayout";

const BasicMapDescription = () => {
  const markdown = `
# Node.js Streams Visualization Application 📊 [id="intro"]

## Overview [id="overview"]

This application demonstrates how to efficiently process large files in Node.js using **streams**. It allows you to upload a CSV (or text) file and visualizes the file's processing in real time, chunk-by-chunk, using Server-Sent Events (SSE).

## What are Streams in Node.js? 🔄 [id="what-are-streams"]

**Streams** are a powerful abstraction in Node.js that enable the processing of data piece-by-piece rather than loading an entire file into memory at once. They are built upon the idea of handling data in continuous flows.

### Types of Streams: [id="types-of-streams"]

- **Readable Streams**: Emit data as it becomes available (e.g., reading files, network responses).
- **Writable Streams**: Consume data and write it (e.g., writing files, sending responses).
- **Duplex Streams**: Combine the functionality of both readable and writable streams.
- **Transform Streams**: Are duplex streams that can modify or transform the data as it is read or written.

## Why are Streams Used? ⚙️ [id="why-streams"]

- **Efficiency**: They handle data in manageable chunks, significantly reducing memory usage.
- **Performance**: Enable non-blocking I/O operations, allowing the application to process data while other tasks continue.
- **Real-Time Processing**: Ideal for scenarios where data needs to be processed immediately (e.g., live video/audio processing, CSV parsing).
- **Scalability**: Allow Node.js to work with large datasets without the need for massive memory overhead.

## How are Streams Used? 📘 [id="how-streams"]

Streams are used by creating a **readable stream** from a file or other data source and then processing it chunk-by-chunk. For example:

- **File I/O**: Use \`fs.createReadStream\` to read large files.
- **Piping**: Stream data from one source to another (e.g., reading from a file and piping to an HTTP response or a transform stream).
- **Event Listeners**: Listen to events such as \`data\`, \`end\`, and \`error\` to manage the flow of data.

## When are Streams Used? ⏰ [id="when-streams"]

- **Large Files**: When working with files too large to load into memory.
- **Real-Time Data**: In applications where data arrives continuously and needs immediate processing.
- **Efficient Data Handling**: When aiming to maximize performance and resource utilization by processing data in smaller, more manageable chunks.

## About This Application 🎯 [id="about-app"]

This application is designed to illustrate the concept of streams in Node.js by:

- **File Upload**: Allowing users to upload a CSV file.
- **Stream Processing**: Using Node.js's \`fs.createReadStream\` to read and process the file chunk-by-chunk.
- **Real-Time Visualization**: Sending each chunk as an event to the client using Server-Sent Events (SSE), so you can observe the streaming process live.

## How to Run the Application 🚀 [id="how-to-run"]

1. **Clone the Repository**:
   \`\`\`bash
   git clone <repository-url>
   cd <repository-folder>
   \`\`\`
`;

  return <DescriptionLayout markdown={markdown} />;
};

export default BasicMapDescription;
