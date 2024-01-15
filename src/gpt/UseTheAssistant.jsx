import { MessageSquarePlus } from 'lucide-react';
import OpenAI from 'openai';
import { useState, useEffect } from 'react';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Helper function to create an assistant
export const createAssistant = async () => {
  console.log('Attempting to create an assistant...');
  const assistant = await openai.beta.assistants.create({
    name: "Tubitak Expert 2",
    instructions: "You are a helpful assistant that answers questions from uploaded files.",
    tools: [{ type: "retrieval" }],
    model: "gpt-4-1106-preview",
  });
  console.log('Assistant created:', assistant);
  return assistant;
};

// Helper function to retrieve an existing assistant
export const retrieveAssistant = async (assistantId) => {
  console.log(`Retrieving assistant with ID: ${assistantId}`);
  const assistant = await openai.beta.assistants.retrieve(assistantId);
  console.log('Assistant retrieved:', assistant);
  return assistant;
};

// Helper function to create a new thread
export const createThread = async () => {
  console.log('Creating new thread...');
  const thread = await openai.beta.threads.create();
  console.log('Thread created:', thread);
  return thread;
};

// Helper function to send a message
export const sendMessage = async (threadId, messageContent) => {
  console.log(`Sending message to thread ID ${threadId}:`, messageContent);
  const message = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: messageContent,
  });
  console.log('Message sent:', message);
  return message;
};

// Helper function to run the assistant
export const runAssistant = async (threadId, assistantId, instructions) => {
  console.log(`Running assistant ${assistantId} on thread ${threadId} with instructions:`, instructions);
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    instructions: instructions,
  });
  console.log('Run created:', run);
  return run;
};

// Helper function to get the assistant's response
export const getAssistantResponse = async (threadId) => {
  try {
    console.log(`Getting assistant's response for thread ID ${threadId}`);
    const response = await openai.beta.threads.messages.list( threadId );

    // Check if the response has data
    if (response && response.data) {
      const assistantMessages = response.data.filter(msg => msg.role === 'assistant');
      console.log('Assistant responses:', assistantMessages);
      return assistantMessages.map(msg => msg.content); // Return just the content of the messages
    } else {
      console.log('No messages found or invalid response:', response);
      return [];
    }
  } catch (error) {
    console.error('Error in getAssistantResponse:', error);
    return [];
  }
};


// Helper function to list messages in a thread
export const listMessages = async (threadId) => {
  console.log(`Listing messages for thread ID ${threadId}`);
  const messages = await openai.beta.threads.messages.list(threadId);
  console.log('Messages listed:', messages);
  return messages;
};

// UseTheAssistant component (optional)
const UseTheAssistant = ({ assistantId }) => {
  const [assistant, setAssistant] = useState(null);

  useEffect(() => {
    console.log(`Component mounted. Fetching assistant with ID: ${assistantId}`);
    // Retrieve the assistant when the component mounts
    const fetchAssistant = async () => {
      const assistantData = await retrieveAssistant(assistantId);
      setAssistant(assistantData);
    };

    fetchAssistant();
  }, [assistantId]);

  // Render nothing or a UI depending on your use case
  return null;
};

export default UseTheAssistant;
