import { Modding } from "@flamework/core";
import { Asciify } from "@rbxts/asciify";
import { atom, computed, peek } from "@rbxts/charm";
import { FuzzySearch } from "@rbxts/fuzzy-search";
import Immut from "@rbxts/immut";
import { StringTools } from "@rbxts/tool_pack";
import DraftAtom from "client/Utils/DraftAtom";

export namespace FuzzySearchDemoGuiController {
	export const enum ESearchAlgorithm {
		CosineTextSimilarity = "Cosine-Text-Similarity",
		FuzzyScore = "Fuzzy-Score",
		JaroWinkler = "Jaro-Winkler",

		DamerauLevenshteinDistance = "Damerau-Levenshtein-Distance",
		DamerauLevenshteinDistanceSimilarity = "Damerau-Levenshtein-Distance-Similarity",

		HammingDistanceSimilarity = "Hamming-Distance-Similarity",
		HammingDistance = "Hamming-Distance",
		HammingLevenshteinHybridSimilarity = "Hamming-Levenshtein-Hybrid-Similarity",

		LevenshteinDistance = "Levenshtein-Distance",
		LevenshteinDistanceSimilarity = "Levenshtein-Distance-Similarity",

		NGramCosine = "N-Gram-Cosine",
		NGramJaccard = "N-Gram-Jaccard",
	}

	export const enum ETokenization {
		Word = "Word",
		NGram = "N-Gram",
	}

	const algorithms_require_n_list = [ESearchAlgorithm.NGramCosine, ESearchAlgorithm.NGramJaccard];
	const tokenization_require_n_list = [ETokenization.NGram];

	const algorithms_require_tokenization = [ESearchAlgorithm.CosineTextSimilarity];

	const selected_algorithm_atom = atom(ESearchAlgorithm.JaroWinkler);
	const selected_tokenization_atom = atom(ETokenization.Word);
	const selected_n_atom = atom(3);
	const selected_search_query_atom = atom("");

	const string_lists_atom = atom<Record<ESearchAlgorithm, string[]>>({
		[ESearchAlgorithm.CosineTextSimilarity]: [
			"apple banana cherry date",
			"date cherry banana apple",
			"banana date apple cherry",
			"cherry apple banana date",
			"date apple banana cherry",
			"apple banana date cherry",
			"banana cherry date apple",
			"date banana apple cherry",
			"cherry date banana apple",
			"apple date cherry banana",
			"banana apple date cherry",
			"cherry banana apple date",
			"date cherry apple banana",
			"apple cherry date banana",
			"banana date cherry apple",
			"cherry date apple banana",
			"date apple cherry banana",
			"apple banana date cherry",
			"banana apple cherry date",
			"cherry apple date banana", // Original permutations (25%)
			"apple banana cherry date",
			"date cherry banana apple",
			"banana date apple cherry",

			// New UTF-8 enhanced items (50%)
			"mangó kiwi papaya fig",
			"fig papaya kiwi mangó",
			"çitrus orange lemon lime",
			"lime lemon orange çitrus",
			"bérry mélange: strawberry blueberry",
			"blueberry strawberry mélange-bérry",
			"tropiçål-fruits: pineapple mango",
			"mango pineapple tropiçål_fruits",
			"dried-figs-&-dátès",
			"dátès-&-dried-figs",
			"exotic-frūit-basket",
			"basket frūit exotic",
			"organic-Äpfel & Bananen",
			"Bananen Äpfel organic",
			"tropical-mangosteen rambütán",
			"rambütán mangosteen tropical",

			// Multilingual/mixed script (25%)
			"pomme banane cerise datte", // French
			"fresa plátano cereza higo", // Spanish
			"apfel banane kirsche dattel", // German
			"リンゴ バナナ サクランボ ナツメヤシ", // Japanese (apple, banana, cherry, date)
			"सेब केला चेरी खजूर", // Hindi
		],
		[ESearchAlgorithm.FuzzyScore]: [
			"fzzy",
			"fuzzy",
			"fzzzy",
			"fuzzymatch",
			"fzzmatch",
			"fuzmatch",
			"fzy_scoring",
			"fzzy_score",
			"fuzzy_algorithm",
			"fzzyalg",
			"fuzmatch",
			"fzz_optimized",
			"fuzzysrch",
			"fzzy_search",
			"fuzztional",
			"fzzball",
			"fuzzyme",
			"fuzzinator",
			"fuzzyleven",
			"fzzrank",
			"füzzy_äccent",
			"fžzy_score",
			"fúzzymatch",
			"fżż_optimized",
			"fuzzyñümb3r",
			"fúzzy_çhars",
			"fźźy_ålgo",
			"fuzzý_sëarch",
			"fūzzy_łatin",
			"fæzy_scåndi",
		],
		[ESearchAlgorithm.JaroWinkler]: [
			"jaron",
			"jarov",
			"jaros",
			"jaroinski",
			"jaronawski",
			"jaro_match",
			"jarro",
			"jarr0",
			"jaro_wink",
			"jaro123",
			"jaro_optimized",
			"jaro-variant",
			"jarro_similarity",
			"jaro-algorithm",
			"jaro_test",
			"jaro_best",
			"jaro_special",
			"jaro_version",
			"jaro_number",
			"jaro_implementation",
			"jåro_wink",
			"járø_test",
			"jęro_impl",
			"jaroŵ_similar",
			"jarő_variant",
			"jaroñ_algø",
			"jærø_sim",
			"jaroł_metric",
			"jaroç_šcore",
			"jaroß_impl",
		],
		[ESearchAlgorithm.DamerauLevenshteinDistance]: [
			"daman",
			"damerman",
			"dameraulev",
			"damerau_edit",
			"damereau",
			"damerau1",
			"damerau_test",
			"dameraulv",
			"damerau-sample",
			"damerau_trans",
			"damerau-schmidt",
			"damerau_bound",
			"damerau_calc",
			"damerau-example",
			"damerau_max",
			"damerau_low",
			"damerau_high",
			"damerau_far",
			"damerau_close",
			"damerau_dist",
			"dämérau",
			"damęrau_trans",
			"dameráü_test",
			"damerâu_bound",
			"damerauł_example",
			"damerauç_sample",
			"dāmerau_max",
			"damerauś_edit",
			"damerauž_dist",
			"damerauæ_schmidt",
		],
		[ESearchAlgorithm.DamerauLevenshteinDistanceSimilarity]: [
			"dameraulevenshteinsimilarity",
			"damerau_levenshtein_sim",
			"damerau-levenshtein-similar",
			"damerau_lev_similarity",
			"damerau_levenshtein_match",
			"damerau_levenshtein_score",
			"similarity_damerau",
			"damerau_lev_sim",
			"damerau_sim_measure",
			"damerau-levenshtein-sim",
			"dameraulevsim",
			"dlsimilarity",
			"damerau_levenshtein_ratio",
			"damerau_similarity_index",
			"damerau_similarity_score",
			"damerau_levenshtein_metric",
			"dam_lev_similarity",
			"damerau_lev_similar",
			"damerau_lev_sim_index",
			"dl_similarity_score",
			"damerau_lévenshtein_sim",
			"damerau-levénshtein-similar",
			"damerau_lev_similaritý",
			"damerau-levenshtêin_metric",
			"damerau_similäritÿ",
			"damerau_levénshtein-ratio",
			"damerau_simïlarity",
			"damerau-levęnshtein_score",
			"damerau_levenshtéin_index",
			"damerau_levenshteîn_match",
		],
		[ESearchAlgorithm.HammingDistanceSimilarity]: [
			"hamming1234",
			"hamming1235",
			"hamminh1234",
			"hamm1ng1234",
			"hamming_1234",
			"hamming-1234",
			"hamm1n61234",
			"h4mming1234",
			"hamning1234",
			"hamm1ng1235",
			"hamming12z4",
			"hamming1z34",
			"hamm1ng12z4",
			"hamming12e4",
			"hammingw1234",
			"hamm1ngw1234",
			"hammingq1234",
			"hamming1q34",
			"hamm1ng1q34",
			"hamming1w34",
			"hämming123",
			"hammïng_567",
			"hàmming9!ø",
			"hammingñ_utf",
			"hamm1ngç123",
			"hammîng€456",
			"hammingæ789",
			"hamm1ng_ütf8",
			"hammingß987",
			"hamm1ng¿654",
		],
		[ESearchAlgorithm.HammingDistance]: [
			"abcd1234",
			"abce1234",
			"abcf1234",
			"abcg1234",
			"abch1234",
			"abci1234",
			"abcj1234",
			"abck1234",
			"abcl1234",
			"abcm1234",
			"abcn1234",
			"abco1234",
			"abcp1234",
			"abcq1234",
			"abcr1234",
			"abcs1234",
			"abct1234",
			"abcu1234",
			"abcv1234",
			"abcw1234",
			"ábcd1234",
			"abćd1234",
			"abcð1234",
			"abçd1234",
			"abcd12ß4",
			"abčd1234",
			"abcđ1234",
			"abœd1234",
			"abød1234",
			"abžd1234",
		],
		[ESearchAlgorithm.HammingLevenshteinHybridSimilarity]: [
			"hybrid123",
			"hybr1d123",
			"hybri1234",
			"hybrid12z",
			"hybriq123",
			"hybrid1w3",
			"hybrid12e",
			"hybr1d12e",
			"hybrid-123",
			"hybrid_123",
			"hybrid123!",
			"hybr1d123!",
			"hybrid12s",
			"hybris123",
			"hybri123s",
			"hybrid1z3",
			"hybrid12w",
			"hybr1d1z3",
			"hybridq123",
			"hybr1dq123",
			"hýbrid123",
			"hybřid_utf",
			"hybríd12ž",
			"hŷbrid-ç123",
			"hybrið123",
			"hybrîd1w3",
			"hybridæ12e",
			"hybr1d_ñ123",
			"hybriđq123",
			"hybrïd1z3",
		],
		[ESearchAlgorithm.LevenshteinDistance]: [
			"kittens",
			"sitt1ng",
			"mitten",
			"k1ttens",
			"kittenz",
			"sitten",
			"kitt3n",
			"kittenss",
			"kiTTens",
			"kittens!",
			"kittens_test",
			"kittens-sample",
			"kittens123",
			"k1tt3ns",
			"kit_tens",
			"kitten-s",
			"kittenses",
			"kittens_",
			"kittens-v2",
			"kittens2.0",
			"kitténs",
			"kíttens",
			"kîttens",
			"kittęns",
			"kïttenš",
			"kitténz",
			"kittēns!",
			"kítt3ns",
			"kittêns-v2",
			"kittëns2.0",
		],
		[ESearchAlgorithm.LevenshteinDistanceSimilarity]: [
			"levenshtein",
			"lev3nsht3in",
			"levenstein",
			"levenshte1n",
			"levenshtain",
			"leven_shtein",
			"levenshte-in",
			"levenshtein_sim",
			"levenstein_similarity",
			"levenshtein_ratio",
			"levenshtein-test",
			"levenshtein123",
			"1evenshtein",
			"leven5htein",
			"levenshte!n",
			"l3vensht3in",
			"levenshte1n",
			"leven_shtein",
			"levenshtein-ratio",
			"levenshtein_metric",
			"lëvenšhtein",
			"levénshtêin",
			"leveñshteín",
			"lèvênshtëin",
			"levęnshtein",
			"levenštéin",
			"levenshtéin",
			"lēvenshtein",
			"levenshtėin",
			"levenshteîn",
		],
		[ESearchAlgorithm.NGramCosine]: [
			"nightmare",
			"night_vision",
			"knight_rider",
			"midnight_blue",
			"knighthood",
			"nightly",
			"fortnight",
			"nightingale",
			"midnight_sun",
			"nightwatch",
			"nightshade",
			"night_fury",
			"knights_tale",
			"night_owl",
			"knightly",
			"midnight_snack",
			"night_sky",
			"overnight",
			"night_terrors",
			"night_fever",
			"niģht_visiøn",
			"kñight_rider",
			"midnïght_blüe",
			"nighŧingale",
			"nighŧ_fürÿ",
			"niĝht_terrørs",
			"förtnight",
			"nightshæde",
			"midnïght_škies",
			"knighŧhood",
		],
		[ESearchAlgorithm.NGramJaccard]: [
			"angular",
			"angularity",
			"angularjs",
			"angular-material",
			"angular_bootstrap",
			"rectangular",
			"triangular",
			"angular2",
			"angular-component",
			"angular-service",
			"angular-directive",
			"angular-pipe",
			"angular-module",
			"angular-cli",
			"angular-ui",
			"angular_router",
			"angular_forms",
			"angular_test",
			"angular_universal",
			"angular_firebase",
			"angülär_router",
			"ångular_fire",
			"aňgular_component",
			"rectängular",
			"triangülar",
			"angulař_forms",
			"angular_unïvêrsal",
			"angular_módüle",
			"angùlar-cli",
			"angular_böotstrap",
		],
	});

	const is_asciify_enabled_atom = atom(false);
	const search_results_atom = atom<[number, string][]>([]);

	const require_tokenization_atom = computed(() => {
		const selected_algorithm = selected_algorithm_atom();
		return algorithms_require_tokenization.includes(selected_algorithm);
	});

	const require_n_atom = computed(() => {
		const selected_algorithm = selected_algorithm_atom();
		const selected_tokenization = selected_tokenization_atom();
		return (
			algorithms_require_n_list.includes(selected_algorithm) ||
			(algorithms_require_tokenization.includes(selected_algorithm) &&
				tokenization_require_n_list.includes(selected_tokenization))
		);
	});

	const algorithms_list = Modding.inspect<ESearchAlgorithm[]>() as string[];
	function IsValidAlgorithm(algorithm: string): algorithm is ESearchAlgorithm {
		return algorithms_list.includes(algorithm);
	}
	export function GetAlgorithms(): string[] {
		return algorithms_list;
	}

	const tokenizations_list = Modding.inspect<ETokenization[]>() as string[];
	function IsValidTokenization(tokenization: string): tokenization is ETokenization {
		return tokenizations_list.includes(tokenization);
	}
	export function GetTokenizations(): string[] {
		return tokenizations_list;
	}

	export function SetAlgorithm(algorithm: string) {
		if (!IsValidAlgorithm(algorithm)) return;
		selected_algorithm_atom(algorithm);
	}
	export function GetSelectedAlgorithmAtom(): ESearchAlgorithm {
		return selected_algorithm_atom();
	}

	export function SetTokenization(tokenization: string) {
		if (!IsValidTokenization(tokenization)) return;
		selected_tokenization_atom(tokenization);
	}
	export function GetSelectedTokenizationAtom(): ETokenization {
		return selected_tokenization_atom();
	}

	export function SetN(n: number) {
		if (n < 1) return;
		selected_n_atom(n);
	}
	export function GetSelectedNAtom() {
		return selected_n_atom();
	}

	export function IsTokenizationRequiredAtom(): boolean {
		return require_tokenization_atom();
	}
	export function IsNRequiredAtom(): boolean {
		return require_n_atom();
	}

	export function GetSelectedSearchQuery(): string {
		return selected_search_query_atom();
	}
	export function SetSearchQuery(value: string) {
		selected_search_query_atom(value);
	}

	export function AddString(value: string) {
		const values = value.split(",");
		//removes whitespaces at the end and at the start
		const pattern = "^%s+(.-)%s+$";
		//%1 keeps the extracted content
		const selected_algorithm = peek(selected_algorithm_atom);

		DraftAtom(string_lists_atom, (draft) => {
			const strings_list = draft[selected_algorithm];
			values
				.map((value) => value.gsub(pattern, "%1")[0])
				.filter((value) => value !== "" && Immut.table.find(strings_list, value) === undefined)
				.forEach((value) => Immut.table.insert(strings_list, value));
		});
	}
	export function RemoveString(value: string): void {
		const selected_algorithm = peek(selected_algorithm_atom);
		DraftAtom(string_lists_atom, (draft) => {
			const strings_list = draft[selected_algorithm];
			Immut.table.remove(strings_list, Immut.table.find(strings_list, value));
		});
	}
	export function GetStringsListAtom(): string[] {
		const selected_algorithm = selected_algorithm_atom();
		return string_lists_atom()[selected_algorithm];
	}

	export function IsAsciifyEnabledAtom(): boolean {
		return is_asciify_enabled_atom();
	}
	export function SetAsciifyEnabled(enabled: boolean): void {
		is_asciify_enabled_atom(enabled);
	}

	export function GetSearchResultsAtom(): [number, string][] {
		return search_results_atom();
	}

	function Sort(
		query: string,
		algorithm: ESearchAlgorithm,
		tokenization: ETokenization,
		n: number,
		is_asciify_enabled: boolean,
		original_strings_list: string[],
	): [number, string][] {
		query = is_asciify_enabled ? Asciify(query) : query;
		const processed_strings_list = is_asciify_enabled
			? original_strings_list.map(Asciify)
			: original_strings_list;

		if (algorithm === ESearchAlgorithm.CosineTextSimilarity) {
			const Tokenize = (value: string) => {
				if (tokenization === ETokenization.Word) return FuzzySearch.Tokenization.Word(value);
				else if (tokenization === ETokenization.NGram)
					return FuzzySearch.Tokenization.NGram(value, n);
				throw "Unsupported tokenization";
			};
			const tokenized_strings = processed_strings_list.map(Tokenize);
			const tokenized_query = Tokenize(query);
			return FuzzySearch.Sorting.CosineTextSimilarity(
				original_strings_list,
				tokenized_strings,
				tokenized_query,
			);
		} else if (algorithm === ESearchAlgorithm.DamerauLevenshteinDistance) {
			return FuzzySearch.Sorting.DamerauLevenshteinDistance(
				processed_strings_list,
				query,
				original_strings_list,
			);
		} else if (algorithm === ESearchAlgorithm.DamerauLevenshteinDistanceSimilarity) {
			return FuzzySearch.Sorting.DamerauLevenshteinDinstanceSimilarity(
				processed_strings_list,
				query,
				original_strings_list,
			);
		} else if (algorithm === ESearchAlgorithm.FuzzyScore) {
			return FuzzySearch.Sorting.FuzzyScore(processed_strings_list, query, original_strings_list);
		} else if (algorithm === ESearchAlgorithm.HammingDistance) {
			return FuzzySearch.Sorting.HammingDistance(
				processed_strings_list,
				query,
				original_strings_list,
			);
		} else if (algorithm === ESearchAlgorithm.HammingDistanceSimilarity) {
			return FuzzySearch.Sorting.HammingDistanceSimilarity(
				processed_strings_list,
				query,
				original_strings_list,
			);
		} else if (algorithm === ESearchAlgorithm.HammingLevenshteinHybridSimilarity) {
			return FuzzySearch.Sorting.HammingLevenshteinHybridSimilarity(
				processed_strings_list,
				query,
				original_strings_list,
			);
		} else if (algorithm === ESearchAlgorithm.JaroWinkler) {
			return FuzzySearch.Sorting.JaroWinkler(processed_strings_list, query, original_strings_list);
		} else if (algorithm === ESearchAlgorithm.LevenshteinDistance) {
			return FuzzySearch.Sorting.LevenshteinDistance(
				processed_strings_list,
				query,
				original_strings_list,
			);
		} else if (algorithm === ESearchAlgorithm.LevenshteinDistanceSimilarity) {
			return FuzzySearch.Sorting.LevenshteinDistanceSimilarity(
				processed_strings_list,
				query,
				original_strings_list,
			);
		} else if (algorithm === ESearchAlgorithm.NGramCosine) {
			const tokenized_query = FuzzySearch.Tokenization.NGramCounts(query, n);
			const tokenized_strings = processed_strings_list.map((value) =>
				FuzzySearch.Tokenization.NGramCounts(value, n),
			);
			return FuzzySearch.Sorting.NGramCosine(
				original_strings_list,
				tokenized_strings,
				tokenized_query,
			);
		} else if (algorithm === ESearchAlgorithm.NGramJaccard) {
			const tokenized_query = FuzzySearch.Tokenization.NGramSet(query, n);
			const tokenized_strings = processed_strings_list.map((value) =>
				FuzzySearch.Tokenization.NGramSet(value, n),
			);
			return FuzzySearch.Sorting.NGramJaccard(
				original_strings_list,
				tokenized_strings,
				tokenized_query,
			);
		}

		throw "Unsupported algorithm";
	}
	export function DoSearch(): void {
		const selected_search_query = peek(selected_search_query_atom);
		if (StringTools.IsUndefinedOrEmptyOrWhiteSpace(selected_search_query)) return;

		const selected_algorithm = peek(selected_algorithm_atom);
		const selected_tokenization = peek(selected_tokenization_atom);
		const selected_n = peek(selected_n_atom);
		const is_asciify_enabled = peek(is_asciify_enabled_atom);

		const strings_list = peek(string_lists_atom)[selected_algorithm];
		search_results_atom(
			Sort(
				selected_search_query,
				selected_algorithm,
				selected_tokenization,
				selected_n,
				is_asciify_enabled,
				strings_list,
			),
		);
	}
}
