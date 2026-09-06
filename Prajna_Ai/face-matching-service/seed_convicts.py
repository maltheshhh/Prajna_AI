"""
CIRAS 1.0 - Historical Records Seeder (Replaces legacy seed_convicts.py)
------------------------------------------------------------------------
Delegates to seed_historical.py for enrolling synthetic demonstration subjects P-001..P-010.
"""

import os
import sys

if __name__ == "__main__":
    import seed_historical
    seed_historical.main() if hasattr(seed_historical, 'main') else seed_historical.seed_via_api()
