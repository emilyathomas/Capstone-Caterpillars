import React, { useEffect, useState } from 'react'
import TreeDiagram from './digraphComponent.js';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    margin:'0 auto',
    textAlign: 'center',
    width:'50%',
    color: theme.palette.text.secondary,
  }));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    margin:theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  function Home( {onLogout} ) {
    const [data, setData] = useState([]);
    const [showTree, setShowTree] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
      onLogout();
      navigate('/landing');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching Employer Data')
                const response = await fetch("http://localhost:4000/home");
                console.log(response)
                const result = await response.json();
                setData(result);
                console.log(result)
            } catch (error) {
                console.error('Error fetching Employer Data:');
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
      const handlePopState = (event) => {
          if (event.state && event.state.showTree) {
              setShowTree(true);
          } else {
              setShowTree(false);
          }
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
          window.removeEventListener('popstate', handlePopState);
      };
    }, []);

// Updated handleCardClick function
const handleCardClick = (employeeID) => {
  console.log("Clicked on card with employee ID:", employeeID);
  setShowTree(true);
  navigate(`/tree/${employeeID}`, { state: { showTree: true } });
};

// Updated renderCards function to pass item.employerID to handleCardClick
const renderCards = () => {
  if (!data || data.length === 0) {
    console.log("Unable to load employer cards.");
    return <Typography>No data available</Typography>;
  }
  return data.map((item) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={item.employerID} style={{ padding: '10px' }}>
      <Card
        key={item.employerID}
        onClick={() => {
          console.log("Employee ID:", item.employerID);
          handleCardClick(item.employerID); // Pass item.employerID here
        }}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardActionArea>
          <CardContent>
            <Typography variant="h5">{item.companyName}</Typography>
            <Typography>{item.headquartersAddress}</Typography>
            <Typography>{item.hasEmployed}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  ));
};
    return (
        <Box>
          {showTree ? (
            <TreeDiagram />
          ) : (
            <>
              <Grid container alignItems="center" justifyContent="space-between" spacing={2} style={{paddingBottom: '10px', paddingRight: '10px'}}>
                <Grid item xs>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                </Grid>
                <Grid item>
                  <Button onClick={handleLogout} variant="contained" color="primary">
                    Logout
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ height: 'calc(100vh - 64px)', backgroundColor: 'white', margin: '0', width: '100%' }}>
                {/* Filters */}
                <Grid item xs={2} style={{ padding: '20px', boxShadow: 'inset 0 0 10px #000000' }}>
                  <Stack spacing={2} justifyContent={'center'} alignContent={'center'} width={'auto'}>
                    <Item>Filter 1</Item>
                    <Item>Filter 2</Item>
                    <Item>Filter 3</Item>
                  </Stack>
                </Grid>
                {/* Cards */}
                <Grid item xs={10} style={{ padding: '20px' }}>
                  <Grid container spacing={1} style={{ backgroundColor: "#D3D3D3", padding: 'px', border: "10px solid white", height: '100%', boxSizing: 'border-box' }}>
                    {renderCards()}
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}     
        </Box>
    );
}

export default Home