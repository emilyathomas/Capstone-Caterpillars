import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent';
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

  const StyledSearch = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '50%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  function Home() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching Employer Data')
                const response = await fetch("http://localhost:4000/home");
                console.log(response)
                const result = await response.json();
                setCards(result);
            } catch (error) {
                console.error('Error fetching Employer Data:');
                console.log(error);
            }
        };

        fetchData();
    }, []);


      const renderCards = () => {
          if (! cards || cards.length === 0) {
              console.log("Unable to load employer cards.")
              return <Typography>No data available</Typography>;
          }
          return cards.map((item) => (
              <Grid item xs={4} padding={'20px'}>
                  <Card key={item.id}>
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
      const [query, setQuery] = useState('');
      
      const clearCards = () => {
        setCards([]);
      };
      const handleSearch = async () => {
        try {
          console.log(query);
          const response = await fetch('http://localhost:4000/home/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
            
          });

          const cards = await response.json();
          console.log(cards)
          clearCards();
          setCards(cards);
          renderCards();

        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };

      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      };

      

      

    return (
        <Box>
            <Grid container  justifyContent={"center"}>
              <Grid item >
                <StyledSearch width={"50%"} border={"10px solid black"}>
                    <StyledInputBase width={"50%"} border={"10px solid black"}
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button variant="contained" onClick={handleSearch} endIcon={<SearchIcon />}>
                      Search
                    </Button>
                  </StyledSearch>
                </Grid>
              </Grid>
            
            <Grid container spacing={2} backgroundColor="white" margin={'20 px'} padding={'10px'} boxShadow={20}>
              
              <Grid item xs={2} justifyContent={'center'} alignContent={'center'} boxShadow={30} style={{ display: 'flex' }}>
                  <Stack spacing={2} useFlexGap justifyContent={'center'} alignContent={'center'} width={'auto'}>
                      <Item>Filter 1</Item>
                      <Item>Filter 2</Item>
                      <Item>Filter 3</Item>
                  </Stack>
              </Grid>
              <Grid item xs={10} padding={'20px'}>
                <Grid container spacing={2} backgroundColor="#D3D3D3" padding={'20px'} border={"10px solid white"}>
                    
                  {renderCards()}
                    
                </Grid>
              </Grid>
            </Grid>     


        
        </Box>
        
    );
}

export default Home
