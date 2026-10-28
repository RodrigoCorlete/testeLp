import tomllib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG_PATH = ROOT / "config" / "glaube.toml"


def load(path: Path = CONFIG_PATH) -> dict:
    with open(path, "rb") as f:
        return tomllib.load(f)
