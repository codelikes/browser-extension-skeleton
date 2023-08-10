#!/usr/bin/env zsh

# Default parameters
declare -a DEFAULT_EXTENSIONS=()
declare -a DEFAULT_IGNORE_PATHS=()
declare -a EXTENSIONS=()
declare -a IGNORE_PATHS=()
declare -a GIT_IGNORE

MAX_FILE_SIZE=15 # in KB
OUTPUT_FILE="./gpt-content-output.txt"
ROOT_PATH="./"
VERBOSE=false
DEFAULT_LANG_PRESET=js

# Log function for verbose mode
log() {
  if $VERBOSE; then
    echo "$1"
  fi
}

# Function to set language preset for extensions and ignore paths
set_lang_preset() {
  local language="$1"

  case $language in
  "js")
    DEFAULT_EXTENSIONS=("ts" "js" "json")
    DEFAULT_IGNORE_PATHS=("node_modules")
    ;;
  "python")
    DEFAULT_EXTENSIONS=("py" "txt" "md" "ini")
    DEFAULT_IGNORE_PATHS=("__pycache__" ".git")
    ;;
  "php")
    DEFAULT_EXTENSIONS=("php" "json")
    DEFAULT_IGNORE_PATHS=("vendor")
    ;;
  "bash" | "sh" | "zsh")
    DEFAULT_EXTENSIONS=("sh" "bash" "zsh")
    DEFAULT_IGNORE_PATHS=()
    ;;
  "java")
    DEFAULT_EXTENSIONS=("java" "xml" "properties")
    DEFAULT_IGNORE_PATHS=("build" "out" ".git")
    ;;
  "csharp")
    DEFAULT_EXTENSIONS=("cs" "csproj" "config" "sln")
    DEFAULT_IGNORE_PATHS=("bin" "obj" ".git")
    ;;
  "cpp")
    DEFAULT_EXTENSIONS=("c" "cpp" "h" "hpp")
    DEFAULT_IGNORE_PATHS=("bin" "obj" ".git")
    ;;
  *)
    # Unknown language preset. Using default values.
    DEFAULT_EXTENSIONS=("txt" "md" "json" "xml" "properties" "ini" "config" "yml" "yaml" "conf")
    DEFAULT_IGNORE_PATHS=()
    ;;
  esac

  if [ ${#EXTENSIONS[@]} -eq 0 ]; then
    EXTENSIONS=("${DEFAULT_EXTENSIONS[@]}")
  fi
  if [ ${#IGNORE_PATHS[@]} -eq 0 ]; then
    IGNORE_PATHS=("${DEFAULT_IGNORE_PATHS[@]}")
  fi
}

# Function to display initial parameters
display_parameters() {
  log "Starting the scanning process..."
  log "Root path: $ROOT_PATH"
  log "Extensions to include: ${EXTENSIONS}"
  log "Paths to ignore: ${IGNORE_PATHS}"
  log "Max file size: $MAX_FILE_SIZE KB"
  log "Output file: $OUTPUT_FILE"
  log "Verbose mode: ON"
}

# Echo block to the output file
echo_block() {
  local file_path="$1"
  local relative_path="${file_path#$ROOT_PATH/}" # Remove root path prefix
  log "Processing file: $relative_path"
  echo -n "#GPT_INFO: $relative_path" >>"$OUTPUT_FILE"
  echo -e "\n$(cat "$file_path")" >>"$OUTPUT_FILE"
}

# Read .gitignore file
read_gitignore() {
  log "Reading .gitignore file..."
  if [ -f "$ROOT_PATH/.gitignore" ]; then
    while IFS= read -r line; do
      GIT_IGNORE+=("$line")
    done <"$ROOT_PATH/.gitignore"
  fi
}

# Function to check if a file is ignored
is_ignored() {
  local file_path="$1"
  local relative_path="${file_path#$ROOT_PATH/}" # Получение относительного пути

  log "Checking if file is ignored: $file_path"

  # Проверка .gitignore правил
  if git -C "$ROOT_PATH" check-ignore -q "$file_path"; then
    log "File is ignored: $file_path"
    return 0
  fi

  # Проверка игнорируемых путей
  for ignore_path in "${IGNORE_PATHS[@]}"; do
    if [[ "$relative_path" == "$ignore_path" ]]; then
      log "File is ignored: $file_path"
      return 0
    fi
  done

  log "File is not ignored: $file_path"
  return 1
}

# Function to scan directory
scan_dir() {
  local dir="$1"
  local prefix="$2"

  for item in "$dir"/*; do
    # Skip hidden files and directories except .gitignore
    if [[ $(basename "$item") == .* ]] && [[ $(basename "$item") != ".gitignore" ]]; then
      continue
    fi

    # Check if item is ignored
    if is_ignored "$item"; then
      continue
    fi

    if [[ -d "$item" ]]; then
      scan_dir "$item" "$prefix   "
    elif [[ -f "$item" ]]; then
      local ext="${item##*.}"
      if [[ " ${EXTENSIONS[@]} " =~ " $ext " ]]; then
        local size=$(stat -f%z "$item") # File size in bytes on macOS
        if [[ $size -le $(($MAX_FILE_SIZE * 1024)) ]]; then
          echo_block "$item"
        else
          log "Ignoring large file: $item"
          echo -e "#GPT_INFO: $item\nfile is too big" >>"$OUTPUT_FILE"
        fi
      fi
    fi
  done
}

# Command-line arguments handling
while getopts "e:i:o:s:v" option; do
  case $option in
  e)
    IFS=',' read -r -A EXTENSIONS <<<"$OPTARG"
    ;;
  i)
    IFS=' ' read -r -A IGNORE_PATHS <<<"$OPTARG"
    ;;
  o)
    OUTPUT_FILE="$OPTARG"
    ;;
  s)
    MAX_FILE_SIZE="$OPTARG"
    ;;
  v)
    VERBOSE=true
    ;;
  *)
    echo "Usage: $0 [-e <extensions>] [-o <output file>] [-s <max file size>] [-v] [<directory>]"
    exit 1
    ;;
  esac
done
shift $((OPTIND - 1))

# Merging user parameters with default ones
set_lang_preset $DEFAULT_LANG_PRESET

if [ -n "$1" ]; then
  ROOT_PATH="$1"
fi

# Convert ROOT_PATH to absolute path if not provided
ROOT_PATH=$(
  cd "$ROOT_PATH"
  pwd
)

# Display initial parameters
display_parameters

# Read .gitignore
read_gitignore

# Start scanning
echo "#GPT_INFO: root path is $ROOT_PATH" >"$OUTPUT_FILE"
scan_dir "$ROOT_PATH" ""

echo "You can open the file with the following command:"
echo "open $OUTPUT_FILE"
