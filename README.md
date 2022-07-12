# Showcase to use `rules_js` and the `sharp` dependency

```
# bazelisk --version
bazel 5.2.0
# bazelisk run //icon-converter:icon-converter -- --input loading --output $PWD/loading.png
```

This currently only works because of the following line in `.bazelrc`:

```
# See also: https://github.com/aspect-build/rules_js/issues/217
build --action_env APPDATA=unused --host_action_env APPDATA=unused
```
