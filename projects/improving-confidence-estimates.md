---
layout: page

# The title of the page.
title: Improving Confidence Estimates for Unfamiliar Examples

# Write a short (~150 characters) description of each blog post.
# This description is used to preview the page on search engines, social media, etc.
description: >
  Classifiers make very confident but wrong predictions for relevant but unfamiliar samples.  We propose a methodology to analyze and compare solutions.

# You can show the description on the page by deleting this line:
hide_description: true

---

![Improving Confidence Estimates for Unfamiliar Examples](/assets/img/confidence_header.png)


### People

[Zhizhong Li](/)

[Derek Hoiem](https://dhoiem.cs.illinois.edu/){:target="_blank"}

<video width="640" controls markdown="1">
  <source src="/assets/mp4/confidence_5min.mp4" type="video/mp4">
Your browser does not support the video tag. Download the video [here](/assets/mp4/confidence_5min.mp4).
</video> 


### Abstract

Intuitively, unfamiliarity should lead to lack of confidence. In reality, current algorithms often make highly confident yet wrong predictions when faced with unfamiliar examples that are relevant but not from the training distribution. A classifier we trained to recognize gender is 12 times more likely to be wrong in a 99% confident prediction if presented with a subject from a different age group than those seen during training. In this paper, we compare and evaluate several methods to improve confidence estimates for novel and familiar samples. We propose a testing methodology of splitting novel and familiar samples by attribute (age, breed, subcategory) or sampling (similar datasets collected by different people at different times). We evaluate methods including confidence calibration, ensembles, distillation, and a Bayesian model and use several metrics to analyze label, likelihood, and calibration error. While all methods reduce over-confident errors, the ensemble of calibrated models performs best overall, and T-scaling performs best among the approaches with fastest inference. 
 

### Paper and Oral Presentation

Li, Zhizhong, and Hoiem, Derek. "Improving Confidence Estimates for Unfamiliar Examples." The IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2020.

[[PDF](https://arxiv.org/abs/1804.03166){:target="_blank"}] \| [[Slides](/assets/pdf/confidence_5min_slides.pdf){:target="_blank"}] \| [[Oral](/assets/mp4/confidence_5min.mp4){:target="_blank"}] \| [[Code](https://github.com/lizhitwo/ConfidenceEstimates){:target="_blank"}]

<small style="color: #7f0000">
Note: a previous arXiv version (v3) included erroneous results for T-scaling, where novel samples are mistakenly included in the validation set for calibration. Please disregard the results of that version.
</small>

 
### Bibtex

~~~bibtex
@inproceedings{li2020improving,
  title={Improving Confidence Estimates for Unfamiliar Examples},
  author={Li, Zhizhong and Hoiem, Derek},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  pages={2686--2695},
  year={2020}
}
~~~


### Acknowledgement

This material is based on work supported in part by NSF Award IIS-1421521, and in part by Office of Naval Research grant ONR MURI N00014-16-1-2007.
