// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
const Dashboard = () => {
  const { userData } = useUser();
  const [genderCount, setGenderCount] = useState([]);
  const [loading, setLoading] = useState(true);
  let maleCount = 0;
  let femaleCount = 0;

  useEffect(() => {
    axios
      .get('https://randomuser.me/api/?results=10')
      .then(response => {
        const users = response.data.results;
        console.log(users)
        // Iterate over the users to count genders
        users.forEach(user => {
          if (user.gender === 'male') {
            maleCount++;
          } else if (user.gender === 'female') {
            femaleCount++;
          }
        });

        // Update the state with gender count
        // setGenderCount([
        //   { gender: 'male', count: maleCount },
        //   { gender: 'female', count: femaleCount }
        // ]);
        setGenderCount([
          { gender: 'male', count: maleCount },
          { gender: 'female', count: femaleCount }
        ]);
        setLoading(false);
        console.log('male',maleCount)
        console.log('female',femaleCount)

      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Extract data for the pie chart
 const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: '# of Votes',
        data: genderCount.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              Your Logo
            </Typography>
          </Box>
          <Typography variant="h6" component="div">
            {userData && `Welcome, ${userData.username}!`}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: '4rem', width: '30%', margin: 'auto' }}>
        <h2>Dashboard</h2>
        {  (
          <div>
            {/* Display other user information */}
            
            {/* Conditionally render pie chart when data is available */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <h3>Key Performance Indicator</h3>
                <Pie data={data}/>
              </div>
            )}
          </div>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;

