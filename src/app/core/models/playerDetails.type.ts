import { PlayerTypeInterface } from "./players.type";

export interface PlayerDetailsInterface extends PlayerTypeInterface {
    city_id?: number;
    common_name?: string;
    country_id?: number;
    date_of_birth?: string;
    detailed_position_id?: number;
    display_name?: string;
    firstname?: string;
    gender?: string;
    height?: number;
    id?: number;
    image_path?: string;
    lastname?: string;
    name?: string;
    nationality_id?: number;
    position_id?: number;
    sport_id?: number;
    statistics?: any[];
    type_id?: number;
    weight?: number;
}
