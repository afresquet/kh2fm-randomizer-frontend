import { Settings } from "@valaxor/kh2fm-randomizer/dist/types";
import { GameMode, Leveling } from "@valaxor/kh2fm-randomizer/dist/types/enums";
import { Divider } from "antd";
import React, { useContext } from "react";
import { SeedContext } from "../../context/seed";
import { useValueMapper } from "../../hooks/useValueMapper";
import { SettingSelect } from "./SettingSelect";
import { Marks, SettingSlider } from "./SettingSlider";

const formEXPMarks = { 0: "1x", 1: "2x", 2: "3x", 3: "4x", 4: "5x" };

export const TabPaneSettings: React.FC = () => {
	const {
		settings: [settings, setSettings],
	} = useContext(SeedContext);

	const mapValue = useValueMapper<Settings, number, "gameMode">([
		settings,
		setSettings,
	]);

	return (
		<>
			<div className="tab-pane">
				<SettingSelect
					title="Game Mode"
					optionsMap={{
						// eslint-disable-next-line no-useless-computed-key
						["Base Game"]: GameMode.BASE_GAME,
						// eslint-disable-next-line no-useless-computed-key
						["Garden of Assemblage Mod"]: GameMode.GOA_MOD,
					}}
					value={settings.gameMode}
					disabled
				/>

				<SettingSlider
					title="Critical Mode"
					help="Randomizes abilities normally received at the start of Critical Mode. Disable this when you're not playing on Critical Mode."
					{...mapValue("criticalMode")}
				/>

				<SettingSlider
					title="Leveling"
					help="Max level that can contain a check"
					marks={{ 0: "Level\xa01", 1: "Level\xa050", 2: "Level\xa099" }}
					{...mapValue("leveling")}
				/>

				<SettingSlider
					title="Level Up Abilities"
					marks={Marks.randomizing}
					disabled={settings.leveling === Leveling.LEVEL_ONE}
					{...mapValue("abilities")}
				/>

				<SettingSlider
					title="Randomize Bonus Modifiers"
					{...mapValue("bonusModifiers")}
				/>

				<SettingSlider
					title="Randomize Stats"
					disabled={settings.leveling === Leveling.LEVEL_ONE}
					{...mapValue("stats")}
				/>

				<SettingSlider
					title="Randomize Keyblade Stats"
					{...mapValue("keybladeStats")}
					marks={{ 0: "Vanilla", 1: "Balanced", 2: "Boosted" }}
				/>

				<SettingSlider
					title="Ansem's Reports Depth"
					{...mapValue("reportDepth")}
					marks={{ 0: "First Visits", 1: "Second Visits", 2: "Datas" }}
					help="How deep an Ansem's Report can be at, useful for hint systems"
				/>
			</div>

			<Divider />

			<p style={{ textAlign: "center" }}>
				Take the word "multiplier" with a grain of salt. You will be getting the
				same EXP as usual, but the requirements to reach the next level are
				reduced.
			</p>

			<div className="tab-pane">
				<SettingSlider
					title="EXP Multiplier"
					marks={{ 0: "1x", 1: "1.5x", 2: "2x", 3: "3x", 4: "5x" }}
					{...mapValue("expMultiplier")}
				/>

				<SettingSlider
					title="Valor Form EXP Multiplier"
					marks={formEXPMarks}
					{...mapValue("valorEXP")}
				/>

				<SettingSlider
					title="Wisdom Form EXP Multiplier"
					marks={formEXPMarks}
					{...mapValue("wisdomEXP")}
				/>

				<SettingSlider
					title="Limit Form EXP Multiplier"
					marks={formEXPMarks}
					{...mapValue("limitEXP")}
				/>

				<SettingSlider
					title="Master Form EXP Multiplier"
					marks={formEXPMarks}
					{...mapValue("masterEXP")}
				/>

				<SettingSlider
					title="Final Form EXP Multiplier"
					marks={formEXPMarks}
					{...mapValue("finalEXP")}
				/>
			</div>
		</>
	);
};
