import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Bar, BarChart } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import axios from 'axios';

// Define the chart configuration
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

// Define the types for users
interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

// Example chart data
const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

function Admin() {
  const [home, setHome] = useState<Boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterTerm, setFilterTerm] = useState<string>('name');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editUsername, setEditUsername] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editPhone, setEditPhone] = useState<string>('');
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/users'); // Your API endpoint
      const data = await response.json();
      const mappedUsers = data.map((user: any) => ({
        id: user.id || 0,
        username: user.username || 'Unknown Username',
        name: user.name || 'Unknown Name',
        email: user.email || 'Unknown Email',
        phone: user.phone || 'Unknown Phone',
        role: user.role || 'Unknown Role',
      }));
      setUsers(mappedUsers);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const handleUpdate = async () => {
    if (selectedUser) {
      try {
        const updatedUser = {
          name: editName || selectedUser.name,
          username: editUsername || selectedUser.username,
          email: editEmail || selectedUser.email,
          phone: editPhone || selectedUser.phone,
        };
        await axios.put(`http://localhost:8080/users/${selectedUser.id}`, updatedUser);
        window.alert("User Updated Successfully")
        fetchUsers(); // Refresh the user list after update
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log(id)
      await axios.delete(`http://localhost:8080/users/${id}`);

      window.location.reload();
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (filterTerm === 'name') {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterTerm === 'username') {
      return user.username.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterTerm === 'email') {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div>
      <div className="flex justify-center p-12 gap-8">
        <Button onClick={() => setHome(true)}>Home</Button>
        <Button onClick={() => setHome(false)}>Dashboard</Button>
      </div>
      {!home ? (
        <>
          <h1 className="text-center text-2xl font-bold">Welcome to Admin Dashboard</h1>
          <div className="flex justify-center p-4">
            <img src="https://cdn-icons-png.flaticon.com/128/17446/17446833.png" className="w-24" alt="dashboard" />
          </div>
          <h1 className="text-center text-2xl font-bold mb-4">Name:Admin</h1>
          <h1 className="text-center text-2xl font-bold mb-4">Email:Admin@example.com</h1>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart data={chartData}>
              <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
              <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
            </BarChart>
          </ChartContainer>
        </>
      ) : (
        <>
          <h1 className="text-center text-2xl font-bold">List Of Users</h1>
          <div style={{ padding: '20px' }}>
            {/* Search Input */}
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: '20px' }}
            />

            {/* Filter Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ marginRight: '10px' }}>Filter by:</label>
              <select
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
                style={{ padding: '5px', fontSize: '16px' }}
              >
                <option value="name">Name</option>
                <option value="username">Username</option>
                <option value="email">Email</option>
              </select>
            </div>

            {/* Table */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger
                            className='bg-black text-white h-12 w-28 m-2 text-sm rounded-md'
                            onClick={() => {
                              setSelectedUser(user);
                              setEditName(user.name);
                              setEditUsername(user.username);
                              setEditEmail(user.email);
                              setEditPhone(user.phone);
                            }}
                          >
                            Update
                          </DialogTrigger>
                          <DialogContent className='h-3/4'>
                            <DialogHeader>
                              <DialogTitle>Update User Details</DialogTitle>
                              <DialogDescription>
                                Update the contact information.
                              </DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className='flex flex-col gap-4'>
                                <label className='text-md '>Name:</label>
                                <TextField
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  placeholder="Enter Name"
                                  className='w-56 h-8 m- 2p-4'
                                />
                                <label className='text-md pt-4'>Username:</label>
                                <TextField
                                  value={editUsername}
                                  onChange={(e) => setEditUsername(e.target.value)}
                                  placeholder="Enter Username"
                                  className='w-56 h-8 m-4 p-4 mb-2'
                                />
                                <label className='text-md pt-4'>Email:</label>
                                <TextField
                                  value={editEmail}
                                  onChange={(e) => setEditEmail(e.target.value)}
                                  placeholder="Enter Email"
                                  className='w-56 h-8 m-4 p-4'
                                />
                                <label className='text-md pt-4'>Phone:</label>
                                <TextField
                                  value={editPhone}
                                  onChange={(e) => setEditPhone(e.target.value)}
                                  placeholder="Enter Phone Number"
                                  className='w-56 h-8 m-4 p-4 pb-8'
                                />
                                <Button
                                  onClick={handleUpdate}
                                  className='bg-black text-white h-12 w-28 m-4 text-sm rounded-md'
                                >
                                  Update
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          className='bg-red-500 text-white h-12 w-28 m-2 text-sm rounded-md'
                          onClick={() => setDeleteUserId(user.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Delete Confirmation Dialog */}
            {deleteUserId !== null && (
              <Dialog open onOpenChange={() => setDeleteUserId(null)}>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <DialogContent>
                  <DialogDescription>
                    Are you sure you want to delete this user? This action cannot be undone.
                  </DialogDescription>
                  <div className='flex justify-end gap-4 mt-4'>
                    <Button
                      onClick={() => {
                        if (deleteUserId !== null) {
                          handleDelete(deleteUserId);
                        }
                        setDeleteUserId(null);
                      }}
                      className='bg-red-500 text-white'
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => setDeleteUserId(null)}
                      className='bg-gray-300'
                    >
                      Cancel
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Admin;
