import { AccountInterface } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { Direction, updatePositionWithDirection } from "../utils";
import {
  getEntityIdFromKeys,
  getEvents,
  setComponentsFromEvents,
} from "@dojoengine/utils";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { client }: { client: IWorld },
  contractComponents: ContractComponents,
  { Bat, Ball }: ClientComponents
) {
  const spawn = async (account: AccountInterface, game_id: number) => {
    try {
      const { transaction_hash } = await client.actions.spawn({
        account,
        game_id
      });

      setComponentsFromEvents(
        contractComponents,
        getEvents(
          await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          })
        )
      );
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const move = async (account: AccountInterface, game_id: number, direction: number, player_id: number) => {
    try {
      const { transaction_hash } = await client.actions.move({
        account,
        game_id,
        direction,
        player_id
      });

      setComponentsFromEvents(
        contractComponents,
        getEvents(
          await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          })
        )
      );
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  return {
    spawn,
    move,
  };
}
