from classifier import Classifier

AGGRN_CLF_MODEL_PATH = "../models/model_a.h5"
MSGNY_CLF_MODEL_PATH = "../models/model_b.h5"

AGGRN_LABEL_MAP = ["NAG", "CAG", "OAG"]
MSGNY_LABEL_MAP = ["NGEN", "GEN"]

clf_A = Classifier()
clf_A.load_model(AGGRN_CLF_MODEL_PATH)

clf_B = Classifier()
clf_B.load_model(MSGNY_CLF_MODEL_PATH)

def get_label(numeric_label: int, label_for="A"):
	if label_for.lower() == "a":
		return AGGRN_LABEL_MAP[numeric_label]
	
	return MSGNY_LABEL_MAP[numeric_label]

