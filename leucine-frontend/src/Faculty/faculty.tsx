import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from 'axios';

interface Department {
  id: number;
  name: string;
  description: string;
}

interface Student {
  id: number;
  name: string;
  Course: string;
  department: string;
  email: string;
  phone: string;
}

interface Faculty {
  id: number;
  name: string;
  email: string;
  phone: string;
  officeHours: string;
  department: Department;
}

function Faculty() {
  const [students, setStudents] = useState<Student[]>([]);
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [officeHours, setOfficeHours] = useState<string>('');

  useEffect(() => {
    fetchStudents();
    fetchFaculty();
  }, []);

  useEffect(() => {
    if (faculty) {
      setEmail(faculty.email);
      setPhone(faculty.phone);
      setOfficeHours(faculty.officeHours);
    }
  }, [faculty]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/studentcourse');
      const data = await response.json();
      const mappedStudents = data.map((student: any) => ({
        id: student.userId || 0,
        name: student.user?.name || "Unknown Name",
        Course: student.department?.name || "Unknown Course",
        department: student.department?.name || "Unknown Department",
        email: student.user?.email || "Unknown Email",
        phone: student.user?.phone || "Unknown Phone"
      }));
      setStudents(mappedStudents);
    } catch (error) {
      console.log('Error fetching students:', error);
    }
  };

  const fetchFaculty = async () => {
    try {
      const response = await fetch('http://localhost:8080/faculty');
      const data = await response.json();
      const mappedFaculty = data.map((faculty: any) => ({
        id: faculty.userId || 0,
        name: faculty.user?.name || "Unknown Name",
        email: faculty.user?.email || "Unknown Email",
        phone: faculty.user?.phone || "Unknown Phone",
        officeHours: faculty.officeHours || "Unknown Office Hours",
        department: faculty.department || { id: 0, name: "Unknown Department", description: "No Description" }
      }));
      setFaculty(mappedFaculty[0] || null);
    } catch (error) {
      console.log('Error fetching faculty:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedFaculty = {
        officeHours: officeHours,
        user: {
          email: email,
          phone: phone
        }
      };

      const response = await axios.put('http://localhost:8080/facultyupdate', updatedFaculty);
       window.alert("updated successfully");
       
      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Error updating faculty:', error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold p-4 m-4 sm:text-2xl">List Of Students Enrolled Under Professor</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student: Student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.Course}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog>
        <DialogTrigger className='bg-black text-white h-12 w-28 m-10 text-sm rounded-md'>Update Details</DialogTrigger>
        <DialogContent className='h-3/4'>
          <DialogHeader>
            <DialogTitle>Update Faculty Details</DialogTitle>
            <DialogDescription>
              Update the contact information.
            </DialogDescription>
          </DialogHeader>
          {faculty && (
            <div className='flex flex-col gap-4'>
              <label className='text-md'>Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className='w-56 h-8 m-4 p-4'
              />
              <label className='text-md'>Phone Number:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone Number"
                className='w-56 h-8 m-4 p-4'
              />
              <label className='text-md'>Office Hours:</label>
              <input
                type="text"
                value={officeHours}
                onChange={(e) => setOfficeHours(e.target.value)}
                placeholder="Enter Office Hours"
                className='w-56 h-8 m-4 p-4'
              />
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Faculty;
