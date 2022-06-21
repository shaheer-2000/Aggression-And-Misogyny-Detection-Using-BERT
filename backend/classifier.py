import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
from encoder import Encoder

class Classifier:
	def __init__(self):
		self.encoder = Encoder()

	def predict(self, text, max_len):
		if not self.model:
			return None # raise exception here

		encoded_text = self.encoder.bert_encode([text], max_len)
		y_pred = self.model.predict(encoded_text)
		print(y_pred)
		label = np.argmax(y_pred, axis=1)

		return label

	def load_model(self, path):
		self.model = tf.keras.models.load_model(path, custom_objects={ "KerasLayer": hub.KerasLayer })


if __name__ == "__main__":
	clf = Classifier()
	clf.load_model("../models/model_b.h5")
	label = clf.predict("Feminists suck!", max_len=160)
	print(label)
