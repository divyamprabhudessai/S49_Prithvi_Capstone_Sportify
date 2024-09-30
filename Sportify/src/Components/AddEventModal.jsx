




import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Button, InputNumber } from 'antd';
import axios from 'axios';

const AddEventModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields(); // Get form values after validation

      // Convert DatePicker to ISO string and generate a random eventId
      const formattedEvent = {
        ...values,
        eventDate: values.eventDate.toISOString(),
        eventId: Math.floor(Math.random() * 10000), // Generate a random eventId
      };

      await axios.post('http://localhost:5000/newevents', formattedEvent); // Make POST request to server
      form.resetFields(); // Reset form after successful submission
      onClose(); 
    } catch (error) {
      console.error('Error adding event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Add New Event"
      onCancel={onClose}
      onOk={handleOk}
      confirmLoading={loading}
      okText="Add Event"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="eventName"
          label="Event Name"
          rules={[{ required: true, message: 'Please input the event name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="eventDate"
          label="Event Date"
          rules={[{ required: true, message: 'Please select the event date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please input the event location!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="participants"
          label="Participants"
          rules={[{ required: true, message: 'Please input the number of participants!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEventModal;
