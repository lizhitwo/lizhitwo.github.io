---
layout: page

# The title of the page.
title: Learning without Forgetting

# Write a short (~150 characters) description of each blog post.
# This description is used to preview the page on search engines, social media, etc.
description: >
  Learning without Forgetting adds capabilities to a network while retaining existing ones.

# You can show the description on the page by deleting this line:
hide_description: true

---

![Learning without Forgetting](/assets/img/LwF_header.png)


### People

[Zhizhong Li](/)

[Derek Hoiem](https://dhoiem.cs.illinois.edu/){:target="_blank"}

[![Learning without Forgetting spotlight video](/assets/img/LwF_video_link.png)](http://videolectures.net/eccv2016_li_without_forgetting/?q=learning%20without%20forgetting){:target="_blank"}
 

### Abstract

When building a unified vision system or gradually adding new capabilities to a system, the usual assumption is that training data for all tasks is always available. However, as the number of tasks grows, storing and retraining on such data becomes infeasible. A new problem arises where we add new capabilities to a Convolutional Neural Network (CNN), but the training data for its existing capabilities are unavailable. We propose our Learning without Forgetting method, which uses only new task data to train the network while preserving the original capabilities. Our method performs favorably compared to commonly used feature extraction and fine-tuning adaption techniques and performs similarly to multitask learning that uses original task data we assume unavailable. A more surprising observation is that Learning without Forgetting may be able to replace fine-tuning as standard practice for improved new task performance.
 

### Paper and Spotlight Presentation

Li, Zhizhong, and Hoiem, Derek. "Learning without forgetting." IEEE Transactions on Pattern Analysis and Machine Intelligence (2017).

[[PDF](https://arxiv.org/abs/1606.09282v3){:target="_blank"}]

Li, Zhizhong, and Hoiem, Derek. "Learning without forgetting." European Conference on Computer Vision. Springer International Publishing, 2016.

[[PDF](https://arxiv.org/abs/1606.09282v2){:target="_blank"}] | [[Poster](/assets/pdf/LwF_poster_portrait.pdf){:target="_blank"}] | [[Spotlight](http://videolectures.net/eccv2016_li_without_forgetting/?q=learning%20without%20forgetting){:target="_blank"}] | [[Code](https://github.com/lizhitwo/LearningWithoutForgetting){:target="_blank"}]
 
### Bibtex

~~~bibtex
@inproceedings{li2016learning,
  title={Learning Without Forgetting},
  author={Li, Zhizhong and Hoiem, Derek},
  booktitle={European Conference on Computer Vision},
  pages={614--629},
  year={2016},
  organization={Springer}
}
~~~

### Acknowledgement

This work is supported in part by NSF Awards 14-46765 and 10-53768 and ONR MURI N000014-16-1-2007.
