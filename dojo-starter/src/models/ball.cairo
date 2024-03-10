use starknet::ContractAddress;

const BALL_INITIAL_X: u16 = 200;
const BALL_INITIAL_Y: u16 = 100;
const BALL_INITIAL_X_SPEED: u16 = 5;
const BALL_INITIAL_y_SPEED: u16 = 5;
const BALL_INITAL_HORIZONTOL_DIRECTION: felt252 = 'LEFT';
const BALL_INITAL_VERTICAL_DIRECTION: felt252 = 'DOWN';


#[derive(Model, Copy, Drop, Serde)]
struct Ball {
    #[key]
    game_id: u256,
    x_position: u16,
    y_position: u16,
    horizontol_direction: u16,
    vertical_direction: u16
}


// trait BallTrait {
//     fn new();
//     fn change_direction();
//     fn get_postion();
// }
// #[derive(Copy, Drop, Serde, Introspect)]
// struct Position {
//     x: u256,
//     y: u256
// }

// #[derive(Copy, Drop, Serde, Introspect)]
// struct Speed {
//     x: u256,
//     y: u256,
//     horizontol_direction: felt252,
//     vertical_direction: felt252
// }
// trait Vec2Trait {
//     fn is_zero(self: Vec2) -> bool;
//     fn is_equal(self: Vec2, b: Vec2) -> bool;
// }

// impl Vec2Impl of Vec2Trait {
//     fn is_zero(self: Vec2) -> bool {
//         if self.x - self.y == 0 {
//             return true;
//         }
//         false
//     }

//     fn is_equal(self: Vec2, b: Vec2) -> bool {
//         self.x == b.x && self.y == b.y
//     }
// }

// #[cfg(test)]
// mod tests {
//     use super::{Position, Vec2, Vec2Trait};

//     #[test]
//     #[available_gas(100000)]
//     fn test_vec_is_zero() {
//         assert(Vec2Trait::is_zero(Vec2 { x: 0, y: 0 }), 'not zero');
//     }

//     #[test]
//     #[available_gas(100000)]
//     fn test_vec_is_equal() {
//         let position = Vec2 { x: 420, y: 0 };
//         assert(position.is_equal(Vec2 { x: 420, y: 0 }), 'not equal');
//     }
// }


