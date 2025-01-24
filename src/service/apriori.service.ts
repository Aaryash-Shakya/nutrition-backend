function convertDateMapToTransactions(
	dateMap: Map<string, number[]>
): number[][] {
	const transactions: number[][] = [];
	dateMap.forEach((value) => {
		transactions.push(value);
	});
	return transactions;
}

type FrequentItemset = {
	itemset: number[];
	support: number;
};

function calculateFrequentItemsets(
	transactions: number[][],
	minSupportCount: number
): FrequentItemset[] {
	const calculateSupport = (itemset: number[]): number => {
		const count = transactions.filter((transaction) =>
			itemset.every((item) => transaction.includes(item))
		).length;
		return count;
	};

	const generateCandidates = (
		itemsets: number[][],
		size: number
	): number[][] => {
		const candidates = new Set<string>();
		for (let i = 0; i < itemsets.length; i++) {
			for (let j = i + 1; j < itemsets.length; j++) {
				const union = new Set([...itemsets[i], ...itemsets[j]]);
				if (union.size === size) {
					candidates.add(Array.from(union).sort().join(','));
				}
			}
		}
		return Array.from(candidates).map((candidate) =>
			candidate.split(',').map(Number)
		);
	};

	let size = 1;
	let currentLevel: number[][] = Array.from(new Set(transactions.flat())).map(
		(item) => [item]
	);

	const frequentItemsets: FrequentItemset[] = [];

	while (currentLevel.length > 0) {
		const levelFrequentItemsets = currentLevel
			.map((itemset) => {
				const support = calculateSupport(itemset);
				return { itemset, support };
			})
			.filter(({ support }) => support >= minSupportCount);

		frequentItemsets.push(...levelFrequentItemsets);

		// Generate candidates for the next level
		currentLevel = generateCandidates(
			levelFrequentItemsets.map(({ itemset }) => itemset),
			++size
		);
	}

	return frequentItemsets;
}
type AssociationRule = {
	antecedent: number[];
	consequent: number[];
	confidence: number;
};

function getSubsets(array: number[]): number[][] {
	const subsets: number[][] = [];
	const generate = (current: number[], remaining: number[]) => {
		if (remaining.length === 0) {
			if (current.length > 0) {
				subsets.push(current);
			}
			return;
		}
		generate(current, remaining.slice(1));
		generate([...current, remaining[0]], remaining.slice(1));
	};
	generate([], array);
	return subsets;
}

function arraysEqual(a: number[], b: number[]): boolean {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

function generateAssociationRules(
	frequentItemsets: FrequentItemset[],
	minConfidence: number
): AssociationRule[] {
	const rules: AssociationRule[] = [];

	frequentItemsets.forEach(({ itemset, support }) => {
		if (itemset.length > 1) {
			const subsets = getSubsets(itemset);
			subsets.forEach((antecedent) => {
				const consequent = itemset.filter(
					(item) => !antecedent.includes(item)
				);
				if (consequent.length > 0) {
					const antecedentSupport = frequentItemsets.find((fi) =>
						arraysEqual(fi.itemset, antecedent)
					)?.support;
					if (antecedentSupport) {
						const confidence = support / antecedentSupport;
						if (confidence >= minConfidence) {
							rules.push({ antecedent, consequent, confidence });
						}
					}
				}
			});
		}
	});

	return rules;
}

function generateRecommendations(
	input: number[],
	associationRules: AssociationRule[]
): number[] {
	const recommendations = new Set<number>();

	associationRules.forEach(({ antecedent, consequent }) => {
		if (antecedent.every((item) => input.includes(item))) {
			consequent.forEach((item) => {
				if (!input.includes(item)) {
					recommendations.add(item);
				}
			});
		}
	});

	// there's no duplicates coz we use Set
	return Array.from(recommendations);
}

function getMatchedAssociationRules(
	input: number[],
	associationRules: AssociationRule[]
): AssociationRule[] {
	const matchedRules: AssociationRule[] = [];

	associationRules.forEach(({ antecedent, consequent, confidence }) => {
		if (antecedent.every((item) => input.includes(item))) {
			matchedRules.push({ antecedent, consequent, confidence });
		}
	});

	return matchedRules;
}

function aprioriAlgorithm(
	dateMap: Map<string, number[]>,
	currentItems: number[]
) {
	const SUPPORT = 10;
	const CONFIDENCE = 0.75;

	const transactions = convertDateMapToTransactions(dateMap);

	const frequentItemsets = calculateFrequentItemsets(transactions, SUPPORT);

	const associationRules = generateAssociationRules(
		frequentItemsets,
		CONFIDENCE
	);

	const matchedRules = getMatchedAssociationRules(
		currentItems,
		associationRules
	);

	const recommendations = generateRecommendations(
		currentItems,
		associationRules
	);

	return {
		transactions,
		frequentItemsets,
		associationRules,
		matchedRules,
		recommendations,
	};
}

export default {
	aprioriAlgorithm,
};

