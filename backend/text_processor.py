import nltk
import string
import re
import emoji

class TextProcessor:
  def __init__(self):
    self.stopwords = nltk.corpus.stopwords.words('english')
    self.punct_table = str.maketrans('', '', string.punctuation)
    # self.emoji_patt = re.compile(
    #       '['
    #       u'\U0001F600-\U0001F64F'  # emoticons
    #       u'\U0001F300-\U0001F5FF'  # symbols & pictographs
    #       u'\U0001F680-\U0001F6FF'  # transport & map symbols
    #       u'\U0001F1E0-\U0001F1FF'  # flags
    #       u'\U00002702-\U000027B0'
    #       u'\U000024C2-\U0001F251'
    #       ']+',
    #       flags=re.UNICODE
    #       )
    self.url_patt = re.compile(r'https?://\S+|www\.\S+')
    self.mentions_patt = re.compile(r"(@[A-Za-z0-9]+)")
    self.html_patt = re.compile(r'<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')
    self.stopwords_patt = re.compile(r'\b(' + r'|'.join(self.stopwords) + r')\b\s*')

  def remove_URL(self, text):
      text = str(text)
      return self.url_patt.sub(r'', text)

  def remove_emoji(self, text):
      return emoji.get_emoji_regexp().sub(u'', text)

  def remove_mentions(self, text):
      return self.mentions_patt.sub(r'', text)

  def remove_html(self, text):
      return self.html_patt.sub(r'', text)

  def remove_punct(self, text):
      return text.translate(self.punct_table)

  def remove_stopwords(self, text):
    return self.stopwords_patt.sub('', text)

  def clean_text(self, text):
    text = self.remove_URL(text)
    text =  self.remove_emoji(text)
    text =  self.remove_mentions(text)
    text =  self.remove_punct(text)
    text = self.remove_stopwords(text)
    text = text.replace("\n", " ")
    text = re.sub(r"[0-9]", "", text)
    text =  text.lower()

    return text

  def process(self, text):
    return self.clean_text(text)

if __name__ == "__main__":
	txtprcsr = TextProcessor()
	print(txtprcsr.process("hello world https://youtube.com Lo!@?"))

