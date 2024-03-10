use starknet::ContractAddress;

const BAT_LENGTH: u256 = 4;
const INITAL_BAT_POSITION: u256 = 200;

#[derive(Model, Copy, Drop, Serde)]
struct Bat {
    #[key]
    game_id: u256,
    #[key]
    player_id: u256,
    player: ContractAddress,
    y_index: u16
}



// #[derive(Serde, Copy, Drop, Introspect)]
// enum BatDirection {
//     None,
//     Up,
//     Down,
// }

// impl batDirectionIntoFelt252 of Into<BatDirection, felt252> {
//     fn into(self: BatDirection) -> felt252 {
//         match self {
//             BatDirection::None => 0,
//             BatDirection::Up => 1,
//             BatDirection::Down => 2,
//         }
//     }
// }
// #[derive(Copy, Drop, Serde, Introspect)]
// struct Vec2 {
//     x: u32,
//     y: u32
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


