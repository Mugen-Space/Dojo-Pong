// define the interface
use starknet::{ContractAddress, get_caller_address};
use dojo::world::{IWorldDispatcher};
use dojo_starter::models::bat::{Bat};
use dojo_starter::models::ball::{Ball};
#[starknet::interface]
trait IActions<TContractState> {
    fn spawn(
        self: @TContractState,
        world: IWorldDispatcher,
        player1: ContractAddress,
        player2: ContractAddress,
        game_id: u256
    );
    fn move(
        self: @TContractState,
        world: IWorldDispatcher,
        game_id: u256,
        direction: u256,
        player_id: u256
    );
    fn iter(self: @TContractState, world: IWorldDispatcher, game_id: u256, tick: u32);
    fn get_bats(
        self: @TContractState, world: IWorldDispatcher, game_id: u256, player_id: u256
    ) -> Bat;
    fn get_ball(self: @TContractState, world: IWorldDispatcher, game_id: u256) -> Ball;
}


// dojo decorator
#[dojo::contract]
mod actions {
    use super::IActions;

    use starknet::{ContractAddress, get_caller_address};
    use dojo_starter::models::bat::{Bat};
    // use dojo::world::{IWorldDispatcher};
    use dojo_starter::models::ball::{Ball};
    // use dojo::world::{IWor/ldDispatcher};
    // declaring custom event struct
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Moved: Moved,
        GameOver: GameOver
    }

    // declaring custom event struct
    #[derive(Drop, starknet::Event)]
    struct Moved {
        player_id: u256,
        direction: u256
    }

    #[derive(Drop, starknet::Event)]
    struct GameOver {
        game_id: u256
    }

    // fn next_position(mut bat: Bat, direction: u256) -> Bat {
    //     match direction {
    //         0 => { bat.y_index; },
    //         1 => { bat.y_index -= 1; },
    //         2 => { bat.y_index += 1; },
    //     };
    //     bat
    // }

    // impl: implement functions specified in trait
    #[external(v0)]
    impl ActionsImpl of IActions<ContractState> {
        #[inline(always)]
        fn get_bats(
            self: @ContractState, world: IWorldDispatcher, game_id: u256, player_id: u256
        ) -> Bat {
            get!(world, (game_id, player_id), (Bat))
        }
        fn get_ball(self: @ContractState, world: IWorldDispatcher, game_id: u256) -> Ball {
            get!(world, game_id, (Ball))
        }
        #[inline(always)]
        fn spawn(
            self: @ContractState,
            world: IWorldDispatcher,
            player1: ContractAddress,
            player2: ContractAddress,
            game_id: u256
        ) {
            // Access the world dispatcher for reading.
            // let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            // let player = get_caller_address();

            // Retrieve the player's current position from the world.
            let player_1_key: u256 = 1;
            let player_2_key: u256 = 2;
            let position_bat_1 = get!(world, (game_id, player_1_key), (Bat));
            let position_bat_2 = get!(world, (game_id, player_2_key), (Bat));

            // Retrieve the player's move data, e.g., how many moves they have left.
            let ball = get!(world, game_id, (Ball));

            // Update the world state with the new data.
            // 1. Set players moves to 10
            // 2. Move the player's position 100 units in both the x and y direction.
            set!(
                world,
                (
                    Bat { game_id: game_id, player_id: 1, player: player1, y_index: 200 },
                    Bat { game_id: game_id, player_id: 2, player: player2, y_index: 200 },
                    Ball {
                        game_id: game_id,
                        x_position: 50,
                        y_position: 50,
                        horizontol_direction: 0,
                        vertical_direction: 0
                    }
                )
            );
        }

        #[inline(always)]
        fn move(
            self: @ContractState,
            world: IWorldDispatcher,
            game_id: u256,
            direction: u256,
            player_id: u256
        ) {
            // Access the world dispatcher for reading.
            // let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            // let player = get_caller_address();

            // Retrieve the player's current position and moves data from the world.
            let mut bat = get!(world, (game_id, player_id), (Bat));

            // Deduct one from the player's remaining moves.
            // moves.remaining -= 1;

            // Update the last direction the player moved in.
            // moves.last_direction = direction;

            // Calculate the player's next position based on the provided direction.
            // let next = next_position(bat, direction);
            if (direction == 1) {
                bat.y_index -= 1
            } else {
                bat.y_index += 1
            }

            // Update the world state with the new moves data and position.
            set!(world, (bat));

            // Emit an event to the world to notify about the player's move.
            emit!(world, Moved { player_id, direction });
        }
        #[inline(always)]
        fn iter(self: @ContractState, world: IWorldDispatcher, game_id: u256, tick: u32) {
            // let world = self.world_dispatcher.read();
            let player_1_key: u256 = 1;
            let player_2_key: u256 = 2;
            let mut bat1 = get!(world, (game_id, player_1_key), (Bat));
            let mut bat2 = get!(world, (game_id, player_2_key), (Bat));
            let mut ball = get!(world, game_id, (Ball));
            let is_changed = self._update_position(game_id, ref ball, bat1, bat2);
            if (!is_changed) {
                emit!(world, GameOver { game_id });
            } else {
                set!(world, (ball));
            }
        }
    }

    #[generate_trait]
    impl Internal of InternalTrait {
        #[inline(always)]
        fn _update_position(
            self: @ContractState, game_id: u256, ref ball: Ball, bat1: Bat, bat2: Bat
        ) -> bool {
            self._get_new_position(ref ball);
            self._check_wall_collision(ref ball);
            self._check_bat_collision(ref ball, bat1, bat2, game_id)
        }
        #[inline(always)]
        fn _get_new_position(self: @ContractState, ref ball: Ball) {
            if (ball.horizontol_direction == 0) {
                ball.x_position -= 5;
            } else {
                ball.x_position += 5;
            }
            if (ball.vertical_direction == 0) {
                ball.y_position += 5;
            } else {
                ball.y_position -= 5;
            }
        }
        #[inline(always)]
        fn _check_bat_collision(
            self: @ContractState, ref ball: Ball, bat1: Bat, bat2: Bat, game_id: u256
        ) -> bool {
            if (ball.x_position <= 10) {
                if (bat1.y_index + 2 >= ball.y_position && bat1.y_index - 2 <= ball.y_position) {
                    ball.horizontol_direction = 1;
                    ball.x_position = 10 + (10 - ball.x_position);
                    return true;
                } else {
                    return false;
                }
            } else if (ball.x_position >= 600) {
                if (bat2.y_index + 2 >= ball.y_position && bat2.y_index - 2 <= ball.y_position) {
                    ball.horizontol_direction = 0;
                    ball.x_position = 600 - (ball.x_position - 600);
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
        #[inline(always)]
        fn _check_wall_collision(self: @ContractState, ref ball: Ball) {
            if (ball.y_position <= 10) {
                ball.vertical_direction = 0;
                ball.y_position = 10 + (10 - ball.y_position);
            }
            if (ball.y_position >= 600) {
                ball.vertical_direction = 1;
                ball.y_position = 600 - (ball.y_position - 600);
            }
        }
    }
}
