// __tests__/specialordercontroller.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { getAllOrders, addOrders, getById, updateOrder, deleteOrder, updateStatus } = require('../Controllers/Specialordercontroller');
const Order = require('../Model/Specialordermodel');

// Mock Mongoose model
jest.mock('../Model/Specialordermodel');

// Create an express app for testing
const app = express();
app.use(express.json());

app.get('/orders', getAllOrders);
app.post('/orders', addOrders);
app.get('/orders/:id', getById);
app.put('/orders/:id', updateOrder);
app.delete('/orders/:id', deleteOrder);
app.patch('/orders/:id/status', updateStatus);

describe('Specialordercontroller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should get all orders', async () => {
    Order.find.mockResolvedValue([{ _id: '1', contactname: 'John Doe' }]);

    const response = await request(app).get('/orders');
    expect(response.status).toBe(200);
    expect(response.body.Orders).toHaveLength(1);
    expect(response.body.Orders[0].contactname).toBe('John Doe');
  });

  test('should add a new order', async () => {
    const newOrder = {
      contactname: 'John Doe',
      typeofuser: 'customer',
      contactemail: 'john@example.com',
      address: '123 Main St',
      listofitems: ['item1', 'item2'],
      prefereddate: '2024-12-01',
      preferedtime: '10:00 AM',
      totalweight: 10,
      totalamount: 100,
      status: 'pending',
    };

    Order.prototype.save = jest.fn().mockResolvedValue(newOrder);

    const response = await request(app).post('/orders').send(newOrder);
    expect(response.status).toBe(200);
    expect(response.body.orders.contactname).toBe('John Doe');
  });

  test('should get an order by ID', async () => {
    const order = { _id: '1', contactname: 'John Doe' };
    Order.findById.mockResolvedValue(order);

    const response = await request(app).get('/orders/1');
    expect(response.status).toBe(200);
    expect(response.body.order.contactname).toBe('John Doe');
  });

  test('should update an order', async () => {
    const updatedOrder = {
      contactname: 'Jane Doe',
      typeofuser: 'customer',
      contactemail: 'jane@example.com',
      address: '456 Main St',
      listofitems: ['item1', 'item2'],
      prefereddate: '2024-12-01',
      preferedtime: '10:00 AM',
      totalweight: 20,
      totalamount: 200,
      status: 'completed',
    };

    Order.findByIdAndUpdate.mockResolvedValue(updatedOrder);

    const response = await request(app).put('/orders/1').send(updatedOrder);
    expect(response.status).toBe(200);
    expect(response.body.orders.contactname).toBe('Jane Doe');
  });

  test('should delete an order', async () => {
    const order = { _id: '1', contactname: 'John Doe' };
    Order.findByIdAndDelete.mockResolvedValue(order);

    const response = await request(app).delete('/orders/1');
    expect(response.status).toBe(200);
    expect(response.body.order.contactname).toBe('John Doe');
  });

  test('should update order status', async () => {
    const updatedOrder = { _id: '1', status: 'completed' };
    Order.findByIdAndUpdate.mockResolvedValue(updatedOrder);

    const response = await request(app).patch('/orders/1/status').send({ status: 'completed' });
    expect(response.status).toBe(200);
    expect(response.body.updatedOrder.status).toBe('completed');
  });
});
