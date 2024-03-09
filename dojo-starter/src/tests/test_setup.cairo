#[cfg(test)]
mod setup {
    // Starknet imports

    use starknet::ContractAddress;
    use starknet::testing::set_contract_address;

    // Dojo imports

    use dojo::world::{IWorldDispatcherTrait, IWorldDispatcher};
    use dojo::test_utils::{spawn_test_world, deploy_contract};

    // Internal imports
    use dojo_starter::models::ball::{ball, Ball};
    use dojo_starter::models::bat::{bat, Bat};

    // use zdefender::models::game::{game, Game};
    // use zdefender::models::mob::{mob, Mob};
    // use zdefender::models::tower::{tower, Tower};
    use dojo_starter::systems::{player::{actions, IActionsDispatcher, IActionsDispatcherTrait}};


    // Constants

    fn PLAYER() -> ContractAddress {
        starknet::contract_address_const::<'PLAYER'>()
    }
    fn PLAYER2() -> ContractAddress {
        starknet::contract_address_const::<'PLAYER'>()
    }

    #[derive(Drop)]
    struct Systems {
        player_actions: IActionsDispatcher,
    }

    fn spawn_game() -> (IWorldDispatcher, Systems) {
        // [Setup] World
        let mut models = array![ball::TEST_CLASS_HASH, bat::TEST_CLASS_HASH];
        // models.append(ball::TEST_CLASS_HASH);
        // models.append(bat::TEST_CLASS_HASH);

        // models.append(tower::TEST_CLASS_HASH);
        let world = spawn_test_world(models);

        // [Setup] Systems
        let player_actions_address = deploy_contract(
            actions::TEST_CLASS_HASH.into(), array![].span()
        );
        let systems = Systems {
            player_actions: IActionsDispatcher { contract_address: player_actions_address },
        };

        // [Return]
        set_contract_address(PLAYER());
        (world, systems)
    }

    #[test]
    #[available_gas(1_000_000_000)]
    fn test_build() {
        let (world, systems) = spawn_game();

        let game_id: u256 = 12;
        systems.player_actions.spawn(world, PLAYER(), PLAYER2(), game_id);
        let player_1_bat = systems.player_actions.get_bats(world, game_id, 1);
        assert(player_1_bat.y_index == 200, 'different position detected');
        assert(player_1_bat.game_id == 12, 'different position detected');
        assert(player_1_bat.player_id == 1, 'different position detected');
        assert(player_1_bat.player == PLAYER(), 'different position detected');

        let player_2_bat = systems.player_actions.get_bats(world, game_id, 2);
        assert(player_2_bat.y_index == 200, 'different position detected');
        assert(player_2_bat.game_id == 12, 'different position detected');
        assert(player_2_bat.player_id == 2, 'different position detected');
        assert(player_2_bat.player == PLAYER2(), 'different position detected');

        let ball = systems.player_actions.get_ball(world, game_id,);
        assert(ball.game_id == 12, 'should be 12');
        assert(ball.y_position == 50, 'should be 50');
        assert(ball.x_position == 50, 'should be 50');
        assert(ball.horizontol_direction == 0, 'should be 0');
        assert(ball.vertical_direction == 0, 'should be 0');
    }

    #[test]
    #[available_gas(1_000_000_000)]
    fn test_bat_movement() {
        let (world, systems) = spawn_game();

        let game_id: u256 = 12;
        systems.player_actions.spawn(world, PLAYER(), PLAYER2(), game_id);
        systems.player_actions.move(world, game_id, 1, 1);
        let player_1_bat = systems.player_actions.get_bats(world, game_id, 1);
        assert(player_1_bat.y_index == 199, 'different position detected');
        assert(player_1_bat.game_id == 12, 'different position detected');
        assert(player_1_bat.player_id == 1, 'different position detected');
        assert(player_1_bat.player == PLAYER(), 'different position detected');

        systems.player_actions.move(world, game_id, 1, 1);
        let player_2_bat = systems.player_actions.get_bats(world, game_id, 1);
        assert(player_2_bat.y_index == 198, 'different position detected');
        assert(player_2_bat.game_id == 12, 'different position detected');
        assert(player_2_bat.player_id == 1, 'different position detected');
        assert(player_2_bat.player == PLAYER(), 'different position detected');
    }

    #[test]
    #[available_gas(1_000_000_000)]
    fn test_ball_movement() {
        let (world, systems) = spawn_game();

        let game_id: u256 = 12;
        systems.player_actions.spawn(world, PLAYER(), PLAYER2(), game_id);
        systems.player_actions.iter(world, game_id, 1);

        let ball = systems.player_actions.get_ball(world, game_id,);
        assert(ball.game_id == 12, 'should be 12');
        assert(ball.x_position == 45, 'should be 45');
        assert(ball.y_position == 55, 'should be 55');
        assert(ball.horizontol_direction == 0, 'should be 0');
        assert(ball.vertical_direction == 0, 'should be 0');
    }

    #[test]
    #[available_gas(1_000_000_000)]
    fn test_bat_ball_collision() {
        let (world, systems) = spawn_game();

        let game_id: u256 = 12;
        systems.player_actions.spawn(world, PLAYER(), PLAYER2(), game_id);
        let mut bat_turn = 109;
        loop {
            if (bat_turn == 0) {
                break;
            }
            bat_turn -= 1;
            systems.player_actions.move(world, game_id, 1, 1);
        };
        let player_1_bat = systems.player_actions.get_bats(world, game_id, 1);
        assert(player_1_bat.y_index == 91, 'different position detected');
        assert(player_1_bat.game_id == 12, 'different position detected');
        assert(player_1_bat.player_id == 1, 'different position detected');
        assert(player_1_bat.player == PLAYER(), 'different position detected');

        let mut ball_turn = 7;
        loop {
            if (ball_turn == 0) {
                break;
            }
            ball_turn -= 1;
            systems.player_actions.iter(world, game_id, 1);
        };
        let ball = systems.player_actions.get_ball(world, game_id,);
        assert(ball.game_id == 12, 'should be 12');
        assert(ball.x_position == 15, 'should be 15');
        assert(ball.y_position == 85, 'should be 85');
        assert(ball.horizontol_direction == 0, 'should be 0');
        assert(ball.vertical_direction == 0, 'should be 0');

        systems.player_actions.iter(world, game_id, 1);
        let ball = systems.player_actions.get_ball(world, game_id,);
        assert(ball.game_id == 12, 'should be 12');
        assert(ball.x_position == 10, 'should be 10');
        assert(ball.y_position == 90, 'should be 90');
        assert(ball.horizontol_direction == 1, 'should be 1');
        assert(ball.vertical_direction == 0, 'should be 0');

        systems.player_actions.iter(world, game_id, 1);
        let ball = systems.player_actions.get_ball(world, game_id,);
        assert(ball.game_id == 12, 'should be 12');
        assert(ball.x_position == 15, 'should be 15');
        assert(ball.y_position == 95, 'should be 95');
        assert(ball.horizontol_direction == 1, 'should be 1');
        assert(ball.vertical_direction == 0, 'should be 0');
    }

    #[test]
    #[available_gas(1_000_000_000_000)]
    fn test_wall_ball_collision() {
        let (world, systems) = spawn_game();

        let game_id: u256 = 12;
        systems.player_actions.spawn(world, PLAYER(), PLAYER2(), game_id);
        let mut bat_turn = 109;
        loop {
            if (bat_turn == 0) {
                break;
            }
            bat_turn -= 1;
            systems.player_actions.move(world, game_id, 1, 1);
        };
        let player_1_bat = systems.player_actions.get_bats(world, game_id, 1);
        assert(player_1_bat.y_index == 91, 'different position detected');
        assert(player_1_bat.game_id == 12, 'different position detected');
        assert(player_1_bat.player_id == 1, 'different position detected');
        assert(player_1_bat.player == PLAYER(), 'different position detected');

        let mut ball_turn = 7;
        loop {
            if (ball_turn == 0) {
                break;
            }
            ball_turn -= 1;
            systems.player_actions.iter(world, game_id, 1);
        };
        let ball = systems.player_actions.get_ball(world, game_id);
        assert(ball.game_id == 12, 'should be 12');
        assert(ball.x_position == 15, 'should be 15');
        assert(ball.y_position == 85, 'should be 85');
        assert(ball.horizontol_direction == 0, 'should be 0');
        assert(ball.vertical_direction == 0, 'should be 0');

        systems.player_actions.iter(world, game_id, 1);
        let ball = systems.player_actions.get_ball(world, game_id);
        assert(ball.game_id == 12, 'should be 12');
        assert(ball.x_position == 10, 'should be 10');
        assert(ball.y_position == 90, 'should be 90');
        assert(ball.horizontol_direction == 1, 'should be 1');
        assert(ball.vertical_direction == 0, 'should be 0');

        let mut ball_turn = 102;
        loop {
            if (ball_turn == 0) {
                break;
            }
            ball_turn -= 1;
            systems.player_actions.iter(world, game_id, 1);
        };

        let ball = systems.player_actions.get_ball(world, game_id);
        assert(ball.game_id == 12, 'should be 12');
        assert(ball.x_position == 520, 'should be 520');
        assert(ball.y_position == 600, 'should be 600');
        assert(ball.horizontol_direction == 1, 'should be 0');
        assert(ball.vertical_direction == 1, 'should be 0');

        systems.player_actions.iter(world, game_id, 1);
        let ball = systems.player_actions.get_ball(world, game_id);
        assert(ball.game_id == 12, 'should be 12');
        assert(ball.x_position == 525, 'should be 525');
        assert(ball.y_position == 595, 'should be 595');
        assert(ball.horizontol_direction == 1, 'should be 0');
        assert(ball.vertical_direction == 1, 'should be 0');
    }
}
