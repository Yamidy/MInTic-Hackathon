import WheelComponent from 'react-wheel-of-prizes'


  const dailyChallenges = ['Sin energia por una hora',
    'Dia sin comer carne',
    'Limpieza de emails',
    'Salva la banana solitaria',
    'otro mas',
    'a'
  ]

  const selectedChallenge = (c) => {
    console.log(c)
  }

  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]
  const onFinished = (winner) => {
    alert(winner)
  }

const DailyChallenge = ()=>{

  return(
    <WheelComponent
                segments={dailyChallenges}
                segColors={segColors}
                onFinished={(winner) => onFinished(winner)}
                primaryColor='black'
                contrastColor='white'
                buttonText='Girar'
                isOnlyOnce={true}
                size={200}
                upDuration={100}
                downDuration={1000}
                fontFamily='Sans-serif'
              />
  )
}

export default DailyChallenge
