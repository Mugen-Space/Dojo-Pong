import { Stage, Layer, Rect, Text, Ellipse, Line } from 'react-konva';
import { useState, useEffect } from 'react';
import { WIDTH, HEIGHT, PADDLE_HEIGHT, PADDLE_WIDTH ,PADDLE_MOVE_SPEED } from './constants';

export type PaddleProps = {
  yPos: number
}

export type BallProps = {
  yPos: number
  xPos: number
}

export type ScoreProps = {
  xPos: number
  yPos: number
  score: number
}

export const PaddleLeft = (props: PaddleProps) => {
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

export const PaddleRight = (props: PaddleProps) => {
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

export const BallObject = (props: BallProps) => {
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

export const Score = (props: ScoreProps) => {
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
  
};