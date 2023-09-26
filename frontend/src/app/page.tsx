"use client"
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import CharacterCard from './components/CharacterCard';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';


const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  
  const [showInfiltrates, setShowInfiltrates] = useState(false);
  const [infiltratesAlert, setInfiltratesAlert] = useState(false);
  const [failedAlert, setFailedAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);


  useEffect(() => {
    async function fetchCharacters() {
      try {
        if (showInfiltrates) {
          setSearchValue("");
          setSearchEnabled(false);
          const randomPage = Math.floor(Math.random() * totalPages) + 1;
          setCurrentPage(randomPage);
        } else {
          setSearchEnabled(true);
        }
        const showHumans = showInfiltrates === true ? false : true;
        const response = await fetch(`http://localhost:4000/api/characters?page=${currentPage}&humans=${showHumans}&search=${searchValue}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        
        setCharacters(data.data);
        setTotalPages(data.meta.pages);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [currentPage, searchValue, showInfiltrates]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as any).message}</p>;

  return (
    <main>
      <Box sx={{ flexGrow: 1 }} mb={"7rem"}>
        <AppBar position="fixed" style={{ background: showInfiltrates ? 'red' : 'rgb(36 220 148)' }}>
          <Toolbar>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Rick and Morty Human Finder
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
                <TextField
                  onChange={(event) => setSearchValue(event.target.value)}
                  value={searchValue}
                  disabled={!searchEnabled}
                  style={{ background: "white", borderRadius: "5px" }}
                  fullWidth
                  label="Search by name"
                  margin='normal'
                  id="search" />
              </Grid>
              <Grid item xs={12} sm={4} display="flex" justifyContent="right" alignItems="right">
                <Button
                  onClick={() => setShowInfiltrates(!showInfiltrates)}
                  color="inherit">
                  Start Infiltration
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <Box>
          <Grid container spacing={2}>
            {characters.map((character, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center" alignItems="center">
                <CharacterCard key={index} character={character} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box marginTop={"2rem"} marginBottom={"2rem"}>
          <Grid container spacing={2}>
              <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                  renderItem={(item) => (
                    <PaginationItem
                      {...item}
                    />
                  )}
                  variant="outlined"
                  color="secondary"
                  hidePrevButton
                  hideNextButton
                />
              </Grid>
          </Grid>
        </Box>
        {/* <Alert severity="warning" hidden={infiltratesAlert}>Encuentra los infiltrados! {characters.filter((c: any) => c.species != "Human" && c.found).length}/{characters.length} </Alert>
        <Alert severity="error" hidden={failedAlert}>No pudiste encontrar a todos los infiltrados!</Alert>
        <Alert severity="success" hidden={successAlert}>This is a success alert — check it out!</Alert> */}
      </Container>
    </main>
  );
};

export default Home;
