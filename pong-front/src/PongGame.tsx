import { Stage, Layer, Rect, Text, Ellipse, Line } from 'react-konva';
import { useState, useEffect } from 'react';
import { WIDTH, HEIGHT, PADDLE_HEIGHT, PADDLE_WIDTH ,PADDLE_MOVE_SPEED } from './constants';

type PaddleProps = {
  yPos: number
}

type BallProps = {
  yPos: number
  xPos: number
}

type ScoreProps = {
  xPos: number
  yPos: number
  score: number
}

const PaddleLeft = (props: PaddleProps) => {
  return (
    <Rect
      x={2}
      y={props.yPos}
      width={PADDLE_WIDTH}
      height={PADDLE_HEIGHT}
      shadowColor='#f00'
      fill={'#000'}
    />
  );
}

const PaddleRight = (props: PaddleProps) => {
  return (
    <Rect
      x={WIDTH-PADDLE_WIDTH-2}
      y={props.yPos}
      width={PADDLE_WIDTH}
      height={PADDLE_HEIGHT}
      shadowColor='#00f'
      fill={'#000'}
    />
  );
}

const Ball = (props: BallProps) => {
  return (
    <Ellipse 
      x={props.xPos}
      y={props.yPos}
      radiusX={15}
      radiusY={15}
      fill={'#000'}
      />
  )
}

const Score = (props: ScoreProps) => {
  return (
    <Text 
      x={props.xPos}
      y={props.yPos}
      text={(props.score).toString()}
      fontSize={24}
    />
  )
}

export const PongGame = () =>
{
  // Game objects
  const [leftPadPos, setLeftPadPos] = useState(HEIGHT/2 - PADDLE_HEIGHT/2)
  const [rightPadPos, setRightPadPos] = useState(HEIGHT/2 - PADDLE_HEIGHT/2)
  const [BallPosition, SetBallPosition] = useState<BallProps>({xPos: WIDTH/2, yPos: HEIGHT/2})
  const [leftScore, setLeftScore] = useState<ScoreProps>({xPos: WIDTH/4, yPos: HEIGHT/4, score: 0})
  const [rightScore, setRightScore] = useState<ScoreProps>({xPos: 3*WIDTH/4, yPos: HEIGHT/4, score: 0})
  
  const [keysPressed, setKeysPressed] = useState(new Set());

  useEffect(() => {
    const downHandler = ({key}: {key: any}) => {
      setKeysPressed(prevKeys => new Set(prevKeys).add(key.toString()));
    };

    const upHandler = ({key}: {key: any}) => {
      setKeysPressed(prevKeys => {
        const newKeys = new Set(prevKeys);
        newKeys.delete(key);
        return newKeys;
      });
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);
  
  useEffect(() => {
    if (keysPressed.has('w') && !keysPressed.has('s')) {
      // GO up left
      setLeftPadPos(l => l - PADDLE_MOVE_SPEED)
    }
    if (keysPressed.has('s') && !keysPressed.has('w')) {
      // GO down left
      setLeftPadPos(l => l + PADDLE_MOVE_SPEED)
    }
    if (keysPressed.has('ArrowUp') && !keysPressed.has('ArrowDown')) {
      // Go up right
      setRightPadPos(r => r - PADDLE_MOVE_SPEED)
    }
    if (keysPressed.has('ArrowDown') && !keysPressed.has('ArrowUp')) {
      // Go down right
      setRightPadPos(r => r + PADDLE_MOVE_SPEED)
    }
  }, [keysPressed]);

  return (
    <Stage width={600} height={400}>
      <Layer>
      <Rect x={WIDTH/2-0.5}
          y={0}
          width={1}
          height={HEIGHT}
          shadowColor='#222'
          fill={'#ccc'}
        />
        <Rect x={0}
            y={0}
            width={WIDTH}
            height={HEIGHT}
            shadowColor='#222'
            stroke={'#000'}
            strokeWidth={4}
          />
          
      </Layer>
      <Layer>
        <Score xPos={leftScore.xPos} yPos={leftScore.yPos} score={leftScore.score} />
        <Score xPos={rightScore.xPos} yPos={rightScore.yPos} score={rightScore.score} />
      </Layer>
      <Layer>
      
        <PaddleLeft yPos={leftPadPos} />
        <PaddleRight yPos={rightPadPos} />
        <Ball xPos={BallPosition.xPos} yPos={BallPosition.yPos} />
        
      </Layer>
      
    </Stage>
  );
};