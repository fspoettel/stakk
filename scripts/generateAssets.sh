rm -rf public/assets

# 1x
npx @squoosh/cli --resize '{"enabled":true,"width":600,"height":600,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --webp '{"quality":85,"target_size":0,"target_PSNR":0,"method":4,"sns_strength":50,"filter_strength":60,"filter_sharpness":0,"filter_type":1,"partitions":0,"segments":4,"pass":1,"show_compressed":0,"preprocessing":0,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":1,"alpha_quality":100,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":0}' -d public/assets/1x  src/assets/lossless/*

# 2x
npx @squoosh/cli --resize '{"enabled":true,"width":1200,"height":1200,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --webp '{"quality":85,"target_size":0,"target_PSNR":0,"method":4,"sns_strength":50,"filter_strength":60,"filter_sharpness":0,"filter_type":1,"partitions":0,"segments":4,"pass":1,"show_compressed":0,"preprocessing":0,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":1,"alpha_quality":100,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":0}' -d public/assets/2x  src/assets/lossless/*

# open graph
npx @squoosh/cli --resize '{"enabled":true,"width":1200,"height":1200,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --mozjpeg '{"quality":75,"baseline":false,"arithmetic":false,"progressive":true,"optimize_coding":true,"smoothing":0,"color_space":3,"quant_table":3,"trellis_multipass":false,"trellis_opt_zero":false,"trellis_opt_table":false,"trellis_loops":1,"auto_subsample":true,"chroma_subsample":2,"separate_chroma_quality":false,"chroma_quality":75}' -d public/assets/og  src/assets/lossless/*

# other assets
find ./src/assets -maxdepth 1 -type f | xargs -I {} cp {} public/assets/
