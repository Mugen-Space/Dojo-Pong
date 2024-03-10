import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { Entity, HasValue } from "@dojoengine/recs";
import { useEffect, useState } from "react";
import "./App.css";
import { Direction } from "./utils";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "./dojo/useDojo";
import {
  BallObject,
  BallProps,
  PaddleLeft,
  PaddleRight,
  PongGame,
  Score,
  ScoreProps,
} from "./PongGame";
import { Layer, Rect, Stage } from "react-konva";
import { HEIGHT, PADDLE_HEIGHT, PADDLE_MOVE_SPEED, WIDTH } from "./constants";

function App() {
  const {
    setup: {
      systemCalls: { spawn, move, iter },
      clientComponents: { Bat, Ball },
    },
    account,
  } = useDojo();

  const [clipboardStatus, setClipboardStatus] = useState({
    message: "",
    isError: false,
  });

  const [isRunning, setIsRunning] = useState(false);

  // entity id we are syncing
  const entityId = getEntityIdFromKeys([
    BigInt(account?.account.address),
  ]) as Entity;

  const ballEntityQuery = useEntityQuery(
    [HasValue(Ball, { game_id: BigInt(42) })],
    { updateOnValueChange: true }
  );
  const bat1EntityQuery = useEntityQuery(
    [HasValue(Bat, { game_id: BigInt(42), player_id: BigInt(1) })],
    { updateOnValueChange: true }
  );
  const bat2EntityQuery = useEntityQuery(
    [HasValue(Bat, { game_id: BigInt(42), player_id: BigInt(2) })],
    { updateOnValueChange: true }
  );
  // get current component values
  const bat1 = useComponentValue(Bat, bat1EntityQuery[0]);
  const bat2 = useComponentValue(Bat, bat2EntityQuery[0]);
  const ball = useComponentValue(Ball, ballEntityQuery[0]);

  const [leftPadPos, setLeftPadPos] = useState(HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [rightPadPos, setRightPadPos] = useState(
    HEIGHT / 2 - PADDLE_HEIGHT / 2
  );
  const [BallPosition, SetBallPosition] = useState<BallProps>({
    xPos: WIDTH / 2,
    yPos: HEIGHT / 2,
  });
  const [leftScore, setLeftScore] = useState<ScoreProps>({
    xPos: WIDTH / 4,
    yPos: HEIGHT / 4,
    score: 0,
  });
  const [rightScore, setRightScore] = useState<ScoreProps>({
    xPos: (3 * WIDTH) / 4,
    yPos: HEIGHT / 4,
    score: 0,
  });

  const [keysPressed, setKeysPressed] = useState(new Set());

  useEffect(() => {
    const downHandler = ({ key }: { key: any }) => {
      setKeysPressed((prevKeys) => new Set(prevKeys).add(key.toString()));
    };

    const upHandler = ({ key }: { key: any }) => {
      setKeysPressed((prevKeys) => {
        const newKeys = new Set(prevKeys);
        newKeys.delete(key);
        return newKeys;
      });
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  useEffect(() => {
    console.log("iter1");
    if (isRunning) {
      console.log("iter2");
      const intervalId = setInterval(() => {
        iter(account.account, 42, 1);
      }, 500);
    }
  }, [isRunning]);

  useEffect(() => {
    if (keysPressed.has("w") && !keysPressed.has("s")) {
      // GO up left
      // setLeftPadPos(l => l - PADDLE_MOVE_SPEED)
      move(account.account, 42, 1, 1);
    }
    if (keysPressed.has("s") && !keysPressed.has("w")) {
      // GO down left
      // setLeftPadPos(l => l + PADDLE_MOVE_SPEED)
      move(account.account, 42, 0, 1);
    }
    if (keysPressed.has("ArrowUp") && !keysPressed.has("ArrowDown")) {
      // Go up right
      // setRightPadPos(r => r - PADDLE_MOVE_SPEED)
      move(account.account, 42, 1, 2);
    }
    if (keysPressed.has("ArrowDown") && !keysPressed.has("ArrowUp")) {
      // Go down right
      // setRightPadPos(r => r + PADDLE_MOVE_SPEED)
      move(account.account, 42, 0, 2);
    }
  }, [keysPressed]);

  const handleRestoreBurners = async () => {
    try {
      await account?.applyFromClipboard();
      setClipboardStatus({
        message: "Burners restored successfully!",
        isError: false,
      });
    } catch (error) {
      setClipboardStatus({
        message: `Failed to restore burners from clipboard`,
        isError: true,
      });
    }
  };

  useEffect(() => {
    if (clipboardStatus.message) {
      const timer = setTimeout(() => {
        setClipboardStatus({ message: "", isError: false });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [clipboardStatus.message]);

  return (
    <>
      <button onClick={account?.create}>
        {account?.isDeploying ? "deploying burner" : "create burner"}
      </button>
      {account && account?.list().length > 0 && (
        <button onClick={async () => await account?.copyToClipboard()}>
          Save Burners to Clipboard
        </button>
      )}
      <button onClick={handleRestoreBurners}>
        Restore Burners from Clipboard
      </button>
      {clipboardStatus.message && (
        <div className={clipboardStatus.isError ? "error" : "success"}>
          {clipboardStatus.message}
        </div>
      )}

      <div className="card">
        select signer:{" "}
        <select
          value={account ? account.account.address : ""}
          onChange={(e) => account.select(e.target.value)}
        >
          {account?.list().map((account, index) => {
            return (
              <option value={account.address} key={index}>
                {account.address}
              </option>
            );
          })}
        </select>
        <div>
          <button onClick={() => account.clear()}>Clear burners</button>
          <p>
            You will need to Authorise the contracts before you can use a
            burner. See readme.
          </p>
        </div>
      </div>

      <div className="card">
        <button
          onClick={() => {
            spawn(account.account, 42);
            setIsRunning(true);
          }}
        >
          Spawn
        </button>
        <div>bat stats: {bat1 ? `${bat1.y_index}` : "Need to Spawn"}</div>
        <div>bat stats: {bat2 ? `${bat2.y_index}` : "Need to Spawn"}</div>
        <div>
          ball:{" "}
          {ball
            ? `${ball.x_position}, ${ball.y_position}, ${ball.vertical_direction}, ${ball.horizontol_direction}`
            : "Need to Spawn"}
        </div>
      </div>
      <Stage width={600} height={600}>
        <Layer>
          <Rect
            x={WIDTH / 2 - 0.5}
            y={0}
            width={1}
            height={HEIGHT}
            shadowColor="#222"
            fill={"#ccc"}
          />
          <Rect
            x={0}
            y={0}
            width={WIDTH}
            height={HEIGHT}
            shadowColor="#222"
            stroke={"#000"}
            strokeWidth={4}
          />
        </Layer>
        <Layer>
          <Score
            xPos={leftScore.xPos}
            yPos={leftScore.yPos}
            score={leftScore.score}
          />
          <Score
            xPos={rightScore.xPos}
            yPos={rightScore.yPos}
            score={rightScore.score}
          />
        </Layer>
        <Layer>
          <PaddleLeft yPos={ball ? ball.y_position - 20 : 300} />
          <PaddleRight yPos={ball ? ball.y_position - 30 : 300} />
          <BallObject
            xPos={ball?.x_position || 300}
            yPos={ball?.y_position || 200}
          />
        </Layer>
      </Stage>
    </>
  );
}

export default App;

// // Game objects
