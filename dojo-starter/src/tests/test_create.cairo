// Core imports

#[cfg(test)]
mod create {
    use debug::PrintTrait;

    // Dojo imports

    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};


    use dojo_starter::systems::player::IActionsDispatcherTrait;

    use dojo_starter::tests::test_setup::setup::{spawn_game, Systems, PLAYER, PLAYER2};
    use dojo_starter::models::ball::{ball, Ball};
    use dojo_starter::models::bat::{bat, Bat};

    // Constants

    const ACCOUNT: felt252 = 'ACCOUNT';
    const SEED: felt252 = 'SEED';
    const NAME: felt252 = 'NAME';


    #[test]
    #[available_gas(1_000_000_000)]
    fn test_build() {
        let (world, systems) = spawn_game();

        let game_id: u256 = 12;
        systems.player_actions.spawn(world, game_id);
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
}
