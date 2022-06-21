
import tensorflow_hub as hub
import tokenization
import numpy as np

class Encoder:
	def __init__(self):
		self.BERT_UNCASED = "https://tfhub.dev/tensorflow/bert_en_uncased_L-12_H-768_A-12/2"
		self.BERT_LAYER = hub.KerasLayer(self.BERT_UNCASED, trainable=True)
		self.VOCAB_FILE = self.BERT_LAYER.resolved_object.vocab_file.asset_path.numpy()

		self.do_lower_case = self.BERT_LAYER.resolved_object.do_lower_case.numpy()
		self.tokenizer = tokenization.FullTokenizer(self.VOCAB_FILE, self.do_lower_case)

	def bert_encode(self, texts, max_len=512):
		all_tokens = []
		all_masks = []
		all_segments = []
		
		for text in texts:
			text = self.tokenizer.tokenize(text)
				
			text = text[: max_len - 2]
			input_sequence = ["[CLS]"] + text + ["[SEP]"]
			pad_len = max_len - len(input_sequence)
			
			tokens = self.tokenizer.convert_tokens_to_ids(input_sequence) + [0] * pad_len
			pad_masks = [1] * len(input_sequence) + [0] * pad_len
			segment_ids = [0] * max_len
			
			all_tokens.append(tokens)
			all_masks.append(pad_masks)
			all_segments.append(segment_ids)

		return np.array(all_tokens), np.array(all_masks), np.array(all_segments)

if __name__ == "__main__":
	encoder = Encoder()

