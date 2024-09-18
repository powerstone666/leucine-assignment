import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment } from '@mui/material';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function StudentDashboard() {
  const [home, setHome] = useState<Boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterTerm, setFilterTerm] = useState<string>('name');
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/student'); 
      const data = await response.json();
      console.log(data)
      
      const mappedStudents = data.map((student: any) => ({
        id: student?.id || student?.id || 0,  // Default to 0 if missing
        name: student?.name || "Unknown Name",  // Fallback to 'Unknown Name' if missing
        email: student?.email || "Unknown Department", // Fallback to 'Unknown Department'
        phone: student?.phone || "Unknown Year" 
      }));
      setStudents(mappedStudents);
    } catch (error) {
      console.log('Error fetching students:', error);
    }
  };
  const [profile, setProfile] = useState<any>(null);
  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:8080/studentProfile'); 
      const data = await response.json();
      console.log(data);
  
       structure
      const mappedProfiles = data.map((profile: any) => ({
        id: profile?.user?.id || 0,  // Default to 0 if id is missing
        name: profile?.user?.name || "Unknown Name",  
        email: profile?.user?.email || "Unknown Email", 
        phone: profile?.user?.phone || "Unknown Phone", 
        department: profile?.department?.name || "Unknown Department", 
        year: profile?.year || "Unknown Year", 
      }));
      setProfile(mappedProfiles[0]);
      
      
  
    } catch (error) {
      console.log('Error fetching student profile:', error);
    }
  };
  
  useEffect(() => {
    fetchStudents();
    fetchProfile();
  }, []);

  const filteredStudents = students.filter((student) => {
    if (filterTerm === 'name') {
      return student.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterTerm === 'email') {
      return student.email.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterTerm === 'phone') {
      return student.phone.includes(searchTerm);
    }
    return false;
  });

  return (
    <div>
      <div className="flex justify-center p-12 gap-8">
        <Button onClick={() => setHome(true)}>Home</Button>
        <Button onClick={() => setHome(false)}>Search</Button>
      </div>
      {home ? (
       <>
       <h1 className="text-center text-2xl font-bold">Welcome to Student Dashboard</h1>
       <div className="flex justify-center p-4">
         <img src="https://cdn-icons-png.flaticon.com/128/17446/17446833.png" className="w-24" alt="dashboard" />
       </div>
     
       
       <h1 className="text-center text-2xl font-bold mb-4">Name: {profile?.name || 'Unknown Name'}</h1>
       <h1 className="text-center text-2xl font-bold mb-4">Email: {profile?.email || 'Unknown Email'}</h1>
     
       <TableContainer component={Paper}>
         <Table>
           <TableHead>
             <TableRow>
               <TableCell>Course</TableCell>
               <TableCell>Grade</TableCell>
               <TableCell>Faculty</TableCell>
               <TableCell>Email</TableCell>
               <TableCell>Number</TableCell>
               <TableCell className="text-right">Attendance</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
  <TableRow>
    <TableCell className="font-medium">{profile?.department || 'Unknown Department'}</TableCell>
    <TableCell>{profile?.year || 'N/A'}</TableCell>
    <TableCell>{profile?.name || 'Unknown Faculty'}</TableCell>
    <TableCell>{profile?.email || 'Unknown Email'}</TableCell>
    <TableCell>{profile?.phone || 'Unknown Phone'}</TableCell>
    <TableCell className="text-right">N/A</TableCell> {/* If attendance is not part of the data */}
  </TableRow>
</TableBody>

         </Table>
       </TableContainer>
     </>
     
      ) : (
        <>
          <h1 className="text-center text-2xl font-bold">Search for Students</h1>
          <div style={{ padding: '20px' }}>
          
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

            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ marginRight: '10px' }}>Filter by:</label>
              <select
  value={filterTerm}
  onChange={(e) => setFilterTerm(e.target.value)}
  style={{ padding: '5px', fontSize: '16px' }}
>
  <option value="name">Name</option>
  <option value="email">Email</option>
  <option value="phone">Phone</option> {/* Update this to match the actual field */}
</select>

            </div>

            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>phone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.map((student: Student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default StudentDashboard;
