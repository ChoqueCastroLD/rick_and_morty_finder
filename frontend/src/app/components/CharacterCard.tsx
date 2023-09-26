"use client";
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface Character {
  name: string;
  species: string;
  image: string;
  status: string;
}

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [found, setFound] = useState(false);
  return (
    <Card
        sx={{ maxWidth: 345 }}
        style={{ background: found && character.species != 'Human' ? 'red' : '' }}>
      <CardActionArea
        onClick={() => character.species != 'Human' && setFound(!found)}>
        <CardMedia
          component="img"
          height="120"
          image={character.image}
          alt={character.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {character.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Species: {character.species}
            <br />
            Status: {character.status}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CharacterCard;
