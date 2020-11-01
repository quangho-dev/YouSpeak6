import React from 'react'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'

const Rating = ({englishLevel, color}) => {
  return (
    <span>
{englishLevel === '1' ? <><StarIcon color={color} /><StarBorderIcon color={color} /><StarBorderIcon color={color} /><StarBorderIcon color={color} /><StarBorderIcon color={color} /></> : englishLevel === '2' ? <><StarIcon color={color} /><StarIcon color={color} /><StarBorderIcon color={color} /><StarBorderIcon color={color} /><StarBorderIcon color={color} /></> : englishLevel === '3' ? <><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarBorderIcon color={color} /><StarBorderIcon color={color} /></> : englishLevel === '4' ? <><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarBorderIcon color={color} /></> : englishLevel === '5' ? <><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /><StarIcon color={color} /></> : <><StarBorderIcon color={color} /><StarBorderIcon color={color} /><StarBorderIcon color={color} /><StarBorderIcon color={color} /><StarBorderIcon color={color} /></>}
    </span>
  )
};

Rating.defaultProps={
  color: 'primary'
}

export default Rating